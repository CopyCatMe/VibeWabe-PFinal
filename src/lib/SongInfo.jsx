import { Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { getSongs } from "./data";

function SongInfo({ song = {}, setSongs }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(song.likes || 0);
    const { user } = useAuth();

    // Restablecer el estado cuando cambie la canción
    useEffect(() => {
        // Verifica si el usuario ha dado like
        setLiked(song.likedBy?.includes(user.name) || false);
        setLikes(song.likes || 0); // Establece el número de likes de la canción
    }, [song, user.name]);

    const handleLike = async () => {
        const newLikeState = !liked; // Cambiar el estado del like
        const body = JSON.stringify({
            songId: song._id,
            like: newLikeState,
            likeUser: user.name,
        });

        console.log(body);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/canciones`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
            },
            body: body,
        });

        const data = await res.json();

        if (res.ok) {
            setLiked(newLikeState); // Actualiza el estado de "liked"
            setLikes(prevLikes => newLikeState ? prevLikes + 1 : prevLikes - 1); // Ajusta el número de likes
            getSongs().then((body) => setSongs(body));          
        } else {
            console.error("Error al actualizar el like en la base de datos:", data.message);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <img
                src={song.imageUrl || "logo.png"}
                className="w-12 h-12 rounded-md object-cover cursor-pointer hover:scale-105 transition-all duration-300"
            />
            <div className="hidden sm:flex text-white ml-2">
                <div>
                    <p className="font-semibold text-sm truncate max-w-[120px] cursor-pointer hover:underline">
                        {song.songName || ""}
                    </p>
                    <p className="text-xs text-gray-400 cursor-pointer hover:underline">
                        {song.userName || ""}
                    </p>
                </div>
                <button
                    onClick={handleLike}
                    className="ml-6 transition-all cursor-pointer bg-[#333] hover:bg-[#444] rounded-full p-2"
                >
                    <Heart className={`w-5 h-5 ${liked ? 'text-red-500' : 'text-white'}`} />
                </button>
                <p className="text-xs ml-2">{likes}</p>
            </div>
        </div>
    );
}

export default SongInfo;
