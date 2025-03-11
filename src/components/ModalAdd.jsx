import { useState } from "react";

function ModalAdd({ toggleModal }) {
    const [formData, setFormData] = useState({
        name: "",
        image: null,
        audio: null,
    });

    // Manejo de cambios en los inputs
    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        toggleModal(); // Cierra el modal después de enviar
    };

    // Manejo de clic fuera del modal para cerrarlo
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
                {/* Botón de cerrar */}
                <button
                    onClick={toggleModal}
                    className="absolute top-4 right-6 text-gray-400 hover:text-white transition duration-200 text-lg bg-[#242424] px-3 py-1 rounded-xl"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-semibold mb-6 text-center text-[#FF5733]">Add Song</h2>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input para el nombre de la canción */}
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

                    {/* Input para la imagen (opcional) */}
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

                    {/* Input para el archivo de audio (.mp3) */}
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

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-full bg-[#FF5733] text-white py-3 rounded-lg font-semibold hover:bg-[#FF6B48] transition duration-200"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalAdd;

