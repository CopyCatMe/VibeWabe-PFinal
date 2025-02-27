import { Heart } from "lucide-react";
import React from "react";

function SongInfo({ song = {} }) {
    return (
        <div className="flex items-center gap-2">
            {/* Imagen de la canción con un tamaño adecuado y fallback */}
            <img
                src={
                    song.image ||
                    `https://placehold.co/400x400/ff6347/white?text=${song.title ? song.title[0].toUpperCase() : "U"}`
                } // Usa una imagen de respaldo con la primera letra del nombre de la canción si no hay imagen
                className="w-12 h-12 rounded-md object-cover cursor-pointer hover:scale-105 transition-all duration-300"
            />


            {/* Información de la canción y Botón de Like visible solo en pantallas más grandes que 360px */}
            <div className="hidden sm:flex text-white ml-4">
                <div>
                    <p className="font-semibold text-sm truncate max-w-[120px] cursor-pointer hover:underline">{song.title || "Unknown Song"}</p>
                    <p className="text-xs text-gray-400 cursor-pointer hover:underline">{song.artist || "Unknown Artist"}</p>
                </div>

                {/* Botón de Like */}
                <button className="ml-6 transition-all cursor-pointer bg-[#333] hover:bg-[#444] rounded-full p-2">
                    <Heart className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>

    );
}

export default SongInfo;

