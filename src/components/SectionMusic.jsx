import songs from "../lib/Songs";

// Función para generar colores aleatorios para las imágenes de respaldo
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color.substring(1); // Devuelve solo el código del color sin el #
}

function SectionMusic() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 pb-4">
            {songs.slice(0, 6).map((song, index) => (
                <div
                    key={index}
                    className="bg-[#333] rounded-md p-4 w-full flex flex-col items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    {/* Imagen de la canción */}
                    <img
                        src={
                            song.image ||
                            `https://placehold.co/400x400/${generateRandomColor()}/white?text=${song.title ? song.title[0].toUpperCase() : 'N'}`
                        }
                        alt={song.title || 'Unknown Song'}
                        className="w-full h-48 object-cover rounded-md mb-4 transition-all duration-300 hover:opacity-90"
                    />
                    
                    {/* Información de la canción */}
                    <div className="text-center w-full">
                        <h2 className="text-white font-semibold text-sm sm:text-base md:text-lg">{song.title}</h2> {/* Título más pequeño en móvil, más grande en escritorio */}
                        <p className="text-gray-400 text-xs sm:text-sm">{song.artist}</p> {/* Texto de artista ajustado */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SectionMusic;
