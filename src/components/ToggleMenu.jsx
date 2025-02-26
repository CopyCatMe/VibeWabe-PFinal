import React from 'react';

const ToggleMenu = ({ isOpen, toggleOpen }) => {
  return (
    <button
      onClick={toggleOpen}
      className="flex justify-center items-center gap-1 bg-[#1c1c1c] w-25 h-15 p-1 shadow-md rounded-full cursor-pointer transition-all duration-300"
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      {/* Íconos con transición */}
      <span
        className={` transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? '✕' : '☰'}
      </span>
    </button>
  );
};

export default ToggleMenu;
