import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

function Controls({
    isPlaying,
    togglePlayPause,
    audioRef,
    isLooping,
    toggleLoop,
    prevSong,
    nextSong,
}) {
    return (
        <div className="flex items-center gap-4">
            {/* Botón de Repetir */}
            <button
                className={`transition-all cursor-pointer ${isLooping ? 'text-[#ff6347]' : 'text-white'}`}
                onClick={toggleLoop}
            >
                <Repeat className="w-5 h-5 md:w-4 md:h-4" />
            </button>

            {/* Botón de Volver Atrás */}
            <button
                className="bg-[#333] hover:bg-[#444] rounded-full p-3 md:p-2 transition-all cursor-pointer"
                onClick={prevSong} // Conectando la función previousSong
            >
                <SkipBack className="w-5 h-5 md:w-4 md:h-4 text-white" />
            </button>

            {/* Botón de Play / Pause */}
            <button
                className="bg-[#ff6347] hover:bg-[#ff7b63] rounded-full p-4 md:p-3 transition-all cursor-pointer"
                onClick={togglePlayPause}
            >
                {isPlaying ? <Pause className="w-6 h-6 md:w-5 md:h-5 text-white" /> : <Play className="w-6 h-6 md:w-5 md:h-5 text-white" />}
            </button>

            {/* Botón de Siguiente */}
            <button
                className="bg-[#333] hover:bg-[#444] rounded-full p-3 md:p-2 transition-all cursor-pointer"
                onClick={nextSong} // Conectando la función nextSong
            >
                <SkipForward className="w-5 h-5 md:w-4 md:h-4 text-white" />
            </button>

            {/* Botón de Aleatorio */}
            <button className="transition-all cursor-pointer">
                <Shuffle className="w-5 h-5 md:w-4 md:h-4 text-white" />
            </button>
        </div>
    );
}

export default Controls;
