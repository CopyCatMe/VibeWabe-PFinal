import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "../lib/ProgressBar";
import Controls from "../lib/Controls";
import VolumeControl from "../lib/VolumeControl";
import SongInfo from "../lib/SongInfo.jsx";
import songs from "../lib/Songs.jsx";

function MusicPlayer({ isOpen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef(null);
  const fadeOutTimeoutRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLooping;
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleSongEnd);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [isLooping, currentSongIndex]);

  const updateTime = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(audioRef.current.currentTime / audioRef.current.duration);

      if (audioRef.current.currentTime >= audioRef.current.duration - 1) {
        startFadeOut();
      }
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const fadeAudio = (targetVolume, duration, callback) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const intervalTime = 50;
    const volumeStep = (targetVolume - audio.volume) / (duration / intervalTime);

    const fadeInterval = setInterval(() => {
      if (
        (volumeStep > 0 && audio.volume >= targetVolume) ||
        (volumeStep < 0 && audio.volume <= targetVolume)
      ) {
        clearInterval(fadeInterval);
        if (callback) callback();
        return;
      }
      audio.volume = Math.min(Math.max(audio.volume + volumeStep, 0), 1);
    }, intervalTime);
  };

  const startFadeOut = () => {
    if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);

    fadeOutTimeoutRef.current = setTimeout(() => {
      fadeAudio(0, 1000, () => {
        setIsPlaying(false);
        if (isLooping) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          fadeAudio(volume, 500);
          setIsPlaying(true);
        }
      });
    }, (duration - currentTime - 2) * 1000);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        fadeAudio(0, 500, () => {
          audioRef.current.pause();
          audioRef.current.volume = volume;
        });
      } else {
        audioRef.current.volume = 0;
        audioRef.current.play();
        fadeAudio(volume, 500);
      }
    }
  };

  const handleSongEnd = () => {
    fadeAudio(0, 1000, () => {
      setIsPlaying(false);
      if (isLooping) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        fadeAudio(volume, 500);
        setIsPlaying(true);
      } else {
        nextSong();
      }
    });
  };

  const nextSong = () => {
    fadeAudio(0, 500, () => {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Reiniciar la canción
          audioRef.current.play();
          fadeAudio(volume, 500);
          setIsPlaying(true);
        }
      }, 500);
    });
  };

  const prevSong = () => {
    if (audioRef.current.currentTime > 5) {
      // Si han pasado más de 5 segundos, solo reinicia la canción
      audioRef.current.currentTime = 0;
    } else {
      // Si está en los primeros 5 segundos, cambia a la canción anterior
      fadeAudio(0, 400, () => {
        setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reiniciar la canción
            audioRef.current.play();
            fadeAudio(volume, 500);
            setIsPlaying(true);
          }
        }, 500);
      });
    }
  };



  return (
    <footer className={`fixed bottom-5 left-[260px] w-[calc(100%-280px)] bg-[#1E1E1E] rounded-2xl shadow-lg p-4 transition-all duration-300 ${isOpen ? "" : "translate-x-[-125px]"}`}>
      <audio ref={audioRef} src={songs[currentSongIndex].src}></audio>

      {/* Barra de Progreso */}
      <ProgressBar
        progress={progress}
        duration={duration}
        currentTime={currentTime}
        setProgress={setProgress}
        setCurrentTime={(time) => (audioRef.current.currentTime = time)}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />

      {/* Controles */}
      <div className="flex items-center justify-between w-full">
        {/* Información de la canción */}
        <SongInfo song={songs[currentSongIndex]} />

        {/* Controles de reproducción */}
        <div className="flex flex-1 justify-center">
          <Controls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            audioRef={audioRef}
            isLooping={isLooping}
            toggleLoop={() => setIsLooping(!isLooping)}
            nextSong={nextSong}
            previousSong={prevSong}
          />

        </div>

        {/* Control de Volumen */}
        <VolumeControl audioRef={audioRef} volume={volume} setVolume={setVolume} isMuted={isMuted} setIsMuted={setIsMuted} />
      </div>
    </footer>
  );
}

export default MusicPlayer;
