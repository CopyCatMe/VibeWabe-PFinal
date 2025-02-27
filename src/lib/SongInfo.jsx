import { Heart } from "lucide-react";
import React from "react";

function SongInfo({ song = {} }) {
    return (
        <div className="flex items-center gap-2">
            {/* Imagen de la canción con un tamaño adecuado y fallback */}
            <img
                src={song.image || "/default-image.png"} // Usa una imagen de respaldo si no hay imagen
                alt={song.title || "Song Art"}
                className="w-12 h-12 rounded-md object-cover cursor-pointer hover:scale-105 transition-all duration-300"
            />

            {/* Información de la canción */}
            <div className="text-white">
                <p className="font-semibold text-sm truncate max-w-[120px] cursor-pointer hover:underline">{song.title || "Unknown Song"}</p>
                <p className="text-xs text-gray-400 cursor-pointer hover:underline">{song.artist || "Unknown Artist"}</p>
            </div>
            {/* Botón de Like */}
            <button
                className="transition-all cursor-pointer bg-[#333] hover:bg-[#444] rounded-full p-2 ml-6"
            >
                <Heart className="w-4 h-4 text-white" />
            </button>
        </div>
    );
}

export default SongInfo;

