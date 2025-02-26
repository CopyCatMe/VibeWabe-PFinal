import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

function MusicPlayer({ isOpen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, []);

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(audioRef.current.currentTime / audioRef.current.duration);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = offsetX / rect.width;
    setProgress(newProgress);
    audioRef.current.currentTime = newProgress * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <footer className={`fixed bottom-5 left-[260px] w-[calc(100%-280px)] bg-[#1E1E1E] rounded-2xl shadow-lg p-4 transition-all duration-300 ${isOpen ? '' : 'translate-x-[-125px]'}`}>
      <audio ref={audioRef} src="/pruebasmp3/donpollo.mp3"></audio>

      {/* Barra de Progreso */}
      <div className="w-full mb-3">
        <div
          ref={progressRef}
          className="relative w-full h-2 bg-[#444] rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="absolute top-0 left-0 h-full bg-[#ff6347] rounded-full"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controles de Reproducción */}
      <div className="flex items-center justify-center gap-6">
        <button className="bg-[#333] hover:bg-[#444] rounded-full p-3 transition-all" onClick={() => audioRef.current.currentTime = 0}>
          <SkipBack className="w-5 h-5 text-white" />
        </button>

        <button className="bg-[#ff6347] hover:bg-[#ff7b63] rounded-full p-4 transition-all" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
        </button>

        <button className="bg-[#333] hover:bg-[#444] rounded-full p-3 transition-all">
          <SkipForward className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Control de Volumen */}
      <div className="absolute right-5 bottom-8 flex items-center gap-3">
        <button className="text-white hover:text-gray-300 transition-colors" onClick={toggleMute}>
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-6 h-6" />}
        </button>
        <div className="relative w-28 h-1 bg-gray-600 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-[#ff6347] rounded-full"
            style={{ width: `${volume * 100}%` }}
          ></div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="absolute top-[-4px] left-0 w-full h-3 opacity-0 cursor-pointer"
          />
        </div>
      </div>

    </footer>
  );
}

export default MusicPlayer;
