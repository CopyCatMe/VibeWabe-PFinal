import React from "react";
import { Volume2, VolumeX } from "lucide-react";

function VolumeControl({ audioRef, volume, setVolume, isMuted, setIsMuted }) {
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

  return (
    <div className="hidden sm:flex items-center gap-3">
      <button className="text-white hover:text-gray-300 transition-colors cursor-pointer" onClick={toggleMute}>
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="cursor-pointer accent-[#f86d54]" />
    </div>
  );
}

export default VolumeControl;
