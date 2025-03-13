import { useEffect, useMemo, useState } from "react";
import { getSongs } from "../lib/data";
import { useAuth } from "../context/Auth";

function SectionMusic({ isOpen, onSelectSong, songs, setSongs }) {
    const { user } = useAuth();

    const handleSongClick = (id) => {
        if (onSelectSong) {
            onSelectSong(id); // Pasa el ID de la canción seleccionada al componente padre
        }
    };

    return (
        <div className={`transition-all duration-300 w-[80%] ${isOpen ? '' : 'ml-[-200px]'}`}>
            <div className="w-full overflow-y-scroll h-[calc(100vh-150px)]" style={{ scrollbarWidth: 'none' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 m-1 pb-15 sm:pb-20 pt-5 transition-all duration-300">
                    {songs.slice(0, 50).map((song) => (
                        <div
                            key={song._id}
                            className="rounded-md w-full flex flex-col items-center justify-between transition-all duration-300 hover:scale-105"
                            style={{ userSelect: 'none' }}
                            onClick={() => handleSongClick(song._id)} // Llama a handleSongClick con el ID de la canción
                        >
                            <img
                                src={song.imageUrl}
                                alt={song.songName || 'Unknown Song'}
                                className="w-35 h-35 object-cover rounded-md mb-4 transition-all duration-300 hover:opacity-50 cursor-pointer"
                                draggable="false"
                            />
                            <div className="text-center w-full">
                                <h2 className="text-white font-semibold text-[12px] text-xs sm:text-xs">{song.songName}</h2>
                                <p className="text-gray-400 text-xs sm:text-xs">{song.userName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SectionMusic;