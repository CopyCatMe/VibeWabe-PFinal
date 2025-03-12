import { useState } from "react";
import { useAuth } from "../context/Auth"; // Importa el contexto de autenticación
import { getSongs } from "../lib/data";


function ModalAdd({ toggleModal, setSongs }) {

    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        image: null,
        audio: null,
    });
    const [loading, setLoading] = useState(false);

    const preset_name = "vibewave"; // Preset de Cloudinary
    const cloud_name = "copycatme"; // Cloud name de Cloudinary

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const imageFile = formData.image;
        const audioFile = formData.audio;

        if (!imageFile || !audioFile) {
            console.error("Both image and audio files are required");
            setLoading(false);
            return;
        }

        try {
            // Subir la imagen a Cloudinary
            const imageData = new FormData();
            imageData.append('file', imageFile);
            imageData.append('upload_preset', preset_name);

            const imageResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                {
                    method: 'POST',
                    body: imageData,
                }
            );
            const imageResult = await imageResponse.json();
            const imageUrl = imageResult.url
            console.log(imageUrl)

            // Subir el audio a Cloudinary
            const audioData = new FormData();
            audioData.append('file', audioFile);
            audioData.append('upload_preset', preset_name);

            const audioResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
                {
                    method: 'POST',
                    body: audioData,
                }
            );

            const audioResult = await audioResponse.json();
            const audioUrl = audioResult.url
            console.log(audioUrl)

            const prueba = {
                audioUrl: audioUrl,
                imageUrl: imageUrl,
                songName: formData.name,
                userName: user.name,
            }

            console.log(prueba)

            const songsDBResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/canciones`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
                    },
                    body: JSON.stringify(prueba)
                }
            );

            const songsDB = await songsDBResponse.json();
            console.log(songsDB)

        } catch (error) {
            console.error("Error de red:", error);
        } finally {
            setLoading(false);
            toggleModal(false);
            getSongs().then((body) => {
                setSongs(body);
            })
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            toggleModal();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[#1a1a1a57] bg-opacity-40 z-50 backdrop-blur-sm modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className="bg-[#1A1A1A] p-8 rounded-2xl shadow-2xl w-[400px] relative transform scale-95 opacity-0 animate-fadeInScale">
                <button
                    onClick={toggleModal}
                    className="absolute top-4 right-6 text-gray-400 hover:text-white transition duration-200 text-lg bg-[#242424] px-3 py-1 rounded-xl"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-semibold mb-6 text-center text-[#FF5733]">Add Song</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Song Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[#242424] text-white border border-[#333] rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Song Photo (Optional)</label>
                        <div className="flex items-center space-x-3">
                            <label className="flex items-center justify-center w-full p-3 bg-[#242424] border border-[#333] rounded-lg cursor-pointer hover:bg-[#2E2E2E] transition">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <span className="text-gray-400">Choose Image</span>
                            </label>
                            {formData.image && (
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Song Photo"
                                    className="w-16 h-16 object-cover rounded-lg border border-[#333]"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Audio File (.mp3)</label>
                        <div className="flex items-center space-x-3">
                            <label className="flex items-center justify-center w-full p-3 bg-[#242424] border border-[#333] rounded-lg cursor-pointer hover:bg-[#2E2E2E] transition">
                                <input
                                    type="file"
                                    name="audio"
                                    accept=".mp3"
                                    onChange={handleChange}
                                    required
                                    className="hidden"
                                />
                                <span className="text-gray-400">Choose Audio File</span>
                            </label>
                            {formData.audio && (
                                <span className="text-sm text-gray-400 truncate max-w-[150px]">
                                    {formData.audio.name}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FF5733] text-white py-3 rounded-lg font-semibold hover:bg-[#FF6B48] transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalAdd;