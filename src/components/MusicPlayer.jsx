import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "../lib/ProgressBar";
import Controls from "../lib/Controls";
import VolumeControl from "../lib/VolumeControl";
import SongInfo from "../lib/SongInfo.jsx";
import songs from "../lib/Songs.jsx";

function MusicPlayer({ isOpen, currentSongIndex, setCurrentSongIndex }) {
  if (currentSongIndex === null || currentSongIndex < 0 || currentSongIndex >= songs.length) {
    return null;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSongIndex !== null && songs[currentSongIndex]) {
      const audio = audioRef.current;
      audio.src = songs[currentSongIndex].src;
      audio.load();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Error al reproducir:", error));
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = isMuted;
    }
  }, [volume, isMuted]);

  const updateTime = () => {
    const audio = audioRef.current;
    if (audio && !isDragging) {
      setCurrentTime(audio.currentTime);
      setProgress(audio.currentTime / audio.duration);
    }
  };

  const updateDuration = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSongEnd = () => {
    if (isLooping) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    setIsLooping((prevLooping) => !prevLooping);
  };

  const toggleShuffle = () => {
    setIsShuffling((prevShuffle) => !prevShuffle);
  };

  const getRandomSongIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);
    return randomIndex;
  };

  const prevSong = () => {
    if (audioRef.current.currentTime < 4) {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => {
      if (isShuffling) {
        return getRandomSongIndex();
      }
      return (prev + 1) % songs.length;
    });
  };

  return (
    <footer className={`fixed bottom-0 left-0 w-full md:left-[260px] md:w-[calc(100%-280px)] bg-[#1E1E1E] shadow-lg transition-all duration-300 md:bottom-5 ${isOpen ? "" : "rounded-3xl p-4 translate-x-[-110px]"} ${isOpen ? "p-4 md:rounded-3xl" : ""}`}>
      <audio ref={audioRef} onTimeUpdate={updateTime} onLoadedMetadata={updateDuration} onEnded={handleSongEnd}></audio>

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

      <div className="flex items-center justify-between w-full">
        <SongInfo song={songs[currentSongIndex]} />
        <div className="flex flex-1 justify-center">
          <Controls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            audioRef={audioRef}
            isLooping={isLooping}
            toggleLoop={toggleLoop}
            prevSong={prevSong}
            nextSong={nextSong}
            isShuffling={isShuffling}
            toggleShuffle={toggleShuffle}
          />
        </div>

        <VolumeControl
          audioRef={audioRef}
          volume={volume}
          setVolume={setVolume}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      </div>
    </footer>
  );
}

export default MusicPlayer;
