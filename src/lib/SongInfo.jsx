import { Heart } from "lucide-react";
import React from "react";

function SongInfo({ song = {} }) {
    return (
        <div className="flex items-center gap-2">
            {/* Imagen de la canción con un tamaño adecuado y fallback */}
            <img
                src={
                    song.image ||
                    `https://placehold.co/400x400/ff6347/white?text=${song.title ? song.title[0].toUpperCase() : "O"}`
                } 
                className="w-12 h-12 rounded-md object-cover cursor-pointer hover:scale-105 transition-all duration-300"
            />


            {/* Información de la canción */}
            <div className="hidden sm:flex text-white ml-2">
                <div>
                    <p className="font-semibold text-sm truncate max-w-[120px] cursor-pointer hover:underline">{song.title || ""}</p>
                    <p className="text-xs text-gray-400 cursor-pointer hover:underline">{song.artist || ""}</p>
                </div>

                {/* Botón de Like */}
                {!song.title && !song.artist ? null : (
                    <button className="ml-6 transition-all cursor-pointer bg-[#333] hover:bg-[#444] rounded-full p-2">
                        <Heart className="w-5 h-5 text-white" />
                    </button>
                )}
            </div>
        </div>

    );
}

export default SongInfo;

