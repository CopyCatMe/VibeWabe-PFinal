import songs from "../lib/Songs";

function SectionMusic({ isOpen, onSelectSong }) {
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color.substring(1);
    };

    const handleSongClick = (index) => {
        if (onSelectSong) {
            onSelectSong(index);  // Llamar a la función onSelectSong pasada desde App
        }
    };

    return (
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 m-10 pb-25 transition-all duration-300 w-[80%] ${isOpen ? '' : 'ml-[-230px]'}`}>
            {songs.slice(0, 8).map((song, index) => (
                <div
                    key={index}
                    className="rounded-md w-full flex flex-col items-center justify-between transition-all duration-300 hover:scale-105"
                    style={{ userSelect: 'none' }}
                    onClick={() => handleSongClick(index)} 
                >
                    <img
                        src={song.image || `https://placehold.co/400x400/${generateRandomColor()}/white?text=${song.title[0]}`}
                        alt={song.title || 'Unknown Song'}
                        className="w-full h-40 object-cover rounded-md mb-4 transition-all duration-300 hover:opacity-50 cursor-pointer"
                        draggable="false"
                    />
                    <div className="text-center w-full">
                        <h2 className="text-white font-semibold text-[10px] sm:text-xs md:text-sm">{song.title}</h2>
                        <p className="text-gray-400 text-xs sm:text-xs">{song.artist}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SectionMusic;
