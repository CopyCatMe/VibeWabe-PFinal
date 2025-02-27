import React, { useRef, useState } from "react";

function ProgressBar({ progress, duration, currentTime, setProgress, setCurrentTime }) {
    const progressRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleProgressChange(e);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleProgressChange(e);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleProgressChange = (e) => {
        if (!progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newProgress = Math.min(Math.max(offsetX / rect.width, 0), 1);
        setProgress(newProgress);
        setCurrentTime(newProgress * duration);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div
            className="w-full mb-3"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Barra de progreso */}
            <div
                ref={progressRef}
                className="relative w-full h-2 bg-[#444] rounded-full cursor-pointer"
                onMouseDown={handleMouseDown}
            >
                {/* Progreso llenado */}
                <div className="absolute top-0 left-0 h-full bg-[#ff6347] rounded-full" style={{ width: `${progress * 100}%` }}></div>

                {/* Puntito deslizante */}
                <div
                    className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    style={{ left: `calc(${progress * 100}% - 8px)` }}
                    onMouseDown={handleMouseDown}
                ></div>
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
