import { useMemo } from "react";
import songs from "../lib/Songs";

function SectionMusic({ isOpen, onSelectSong }) {
    // Genera colores aleatorios una sola vez y los almacena en un array
    const songColors = useMemo(() => {
        return songs.map(() => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color.substring(1); // Sin el '#', porque se usa en la URL
        });
    }, []); // Se ejecuta solo una vez al montar el componente

    const handleSongClick = (index) => {
        if (onSelectSong) {
            onSelectSong(index);
        }
    };

    return (
        <div className={`transition-all duration-300 w-[80%] ${isOpen ? '' : 'ml-[-200px]'}`}>
            <div className="w-full overflow-y-scroll h-[calc(100vh-170px)]" style={{ scrollbarWidth: 'none' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 m-1 pb-0 sm:pb-15 pt-5 transition-all duration-300">
                    {songs.slice(0, 50).map((song, index) => (
                        <div
                            key={index}
                            className="rounded-md w-full flex flex-col items-center justify-between transition-all duration-300 hover:scale-105"
                            style={{ userSelect: 'none' }}
                            onClick={() => handleSongClick(index)}
                        >
                            <img
                                src={song.image || `https://placehold.co/400x400/${songColors[index]}/white?text=${song.title[0]}`}
                                alt={song.title || 'Unknown Song'}
                                className="w-35 h-35 object-cover rounded-md mb-4 transition-all duration-300 hover:opacity-50 cursor-pointer"
                                draggable="false"
                            />
                            <div className="text-center w-full">
                                <h2 className="text-white font-semibold text-[12px] text-xs sm:text-xs">{song.title}</h2>
                                <p className="text-gray-400 text-xs sm:text-xs">{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SectionMusic;
