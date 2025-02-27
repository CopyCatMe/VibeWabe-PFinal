import React, { useRef, useState } from "react";

function ProgressBar({ progress, duration, currentTime, setProgress, setCurrentTime }) {
  const progressRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(progress); // Posición fija del puntito

  const handleMouseEnter = () => {
    setIsHovering(true);
    setHoverPosition(progress); // Fijamos la posición del puntito en el progreso actual
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.min(Math.max(offsetX / rect.width, 0), 1);
    setProgress(newProgress);
    setCurrentTime(newProgress * duration);
    setHoverPosition(newProgress); // Actualizamos la posición del puntito al hacer clic
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full mb-3">
      {/* Barra de progreso */}
      <div
        ref={progressRef}
        className="relative w-full h-2 bg-[#444] rounded-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleProgressClick}
      >
        {/* Progreso llenado */}
        <div className="absolute top-0 left-0 h-full bg-[#ff6347] rounded-full" style={{ width: `${progress * 100}%` }}></div>

        {/* Puntito fijo en la posición actual del progreso cuando pasas el cursor */}
        {isHovering && (
          <div
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-opacity duration-200"
            style={{ left: `calc(${hoverPosition * 100}% - 8px)` }} // Se mantiene en la posición del progreso
          ></div>
        )}
      </div>

      {/* Tiempos (inicio / fin) */}
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
