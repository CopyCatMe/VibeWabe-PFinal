import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "../lib/ProgressBar";
import Controls from "../lib/Controls";
import VolumeControl from "../lib/VolumeControl";
import SongInfo from "../lib/SongInfo.jsx";

function MusicPlayer({ isOpen, currentSongId, setCurrentSongId, songs }) {
    // Estados del reproductor
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    // Referencia al elemento de audio
    const audioRef = useRef(null);

    // Encuentra la canción actual basada en el ID
    const currentSong = songs.filter((song) => song._id == currentSongId);

    // Efecto para cargar y reproducir la canción cuando cambia el ID de la canción actual
    useEffect(() => {
        if (currentSong) {
            const audio = audioRef.current;
            audio.src = currentSong[0]?.audioUrl;
            audio.load();
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch((error) => console.log("Error al reproducir:", error));
            }
        }
    }, [currentSongId]);

    // Efecto para actualizar el volumen y el estado de mute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    // Función para actualizar el tiempo actual de la canción
    const updateTime = () => {
        if (audioRef.current && !isDragging) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress(audioRef.current.currentTime / audioRef.current.duration);
        }
    };

    // Función para actualizar la duración de la canción
    const updateDuration = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Función para manejar el final de la canción
    const handleSongEnd = () => {
        if (isLooping) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            nextSong();
        }
    };

    // Función para alternar entre reproducir y pausar
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Función para alternar el modo de bucle
    const toggleLoop = () => {
        setIsLooping((prevLooping) => !prevLooping);
    };

    // Función para alternar el modo de reproducción aleatoria
    const toggleShuffle = () => {
        setIsShuffling((prevShuffle) => !prevShuffle);
    };

    // Función para obtener un ID de canción aleatorio
    const getRandomSongId = () => {
        let randomSong;
        do {
            randomSong = songs[Math.floor(Math.random() * songs.length)];
        } while (randomSong._id === currentSongId);
        return randomSong._id;
    };

    // Función para retroceder a la canción anterior
    const prevSong = () => {
        if (audioRef.current.currentTime < 4) {
            const currentIndex = songs.findIndex((song) => song._id === currentSongId);
            const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
            setCurrentSongId(songs[prevIndex]._id);
        } else {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    // Función para avanzar a la siguiente canción
    const nextSong = () => {
        setCurrentSongId((prevId) => {
            if (isShuffling) return getRandomSongId();
            const currentIndex = songs.findIndex((song) => song._id === prevId);
            return songs[(currentIndex + 1) % songs.length]._id;
        });
    };

    return (
        <footer
            className={`fixed bottom-0 left-0 w-full md:left-[260px] md:w-[calc(100%-280px)] bg-[#1E1E1E] shadow-lg transition-all duration-300 md:bottom-5 ${
                isOpen ? "" : "rounded-3xl p-4 translate-x-[-110px]"
            } ${isOpen ? "p-4 md:rounded-3xl" : ""}`}
        >
            {/* Elemento de audio */}
            <audio
                ref={audioRef}
                onTimeUpdate={updateTime}
                onLoadedMetadata={updateDuration}
                onEnded={handleSongEnd}
            ></audio>

            {/* Barra de progreso */}
            <ProgressBar
                progress={progress}
                duration={duration}
                currentTime={currentTime}
                setProgress={setProgress}
                setCurrentTime={(time) => {
                    setCurrentTime(time);
                    if (audioRef.current) {
                        audioRef.current.currentTime = time;
                    }
                }}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
            />

            {/* Controles y información de la canción */}
            <div className="flex items-center justify-between w-full">
                {/* Información de la canción */}
                <SongInfo song={currentSong[0]} />

                {/* Controles de reproducción */}
                <div className="flex flex-1 justify-center">
                    <Controls
                        isPlaying={isPlaying}
                        togglePlayPause={togglePlayPause}
                        isLooping={isLooping}
                        toggleLoop={toggleLoop}
                        prevSong={prevSong}
                        nextSong={nextSong}
                        isShuffling={isShuffling}
                        toggleShuffle={toggleShuffle}
                    />
                </div>

                {/* Control de volumen */}
                <VolumeControl
                    volume={volume}
                    setVolume={setVolume}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    audioRef={audioRef}
                />
            </div>
        </footer>
    );
}

export default MusicPlayer;