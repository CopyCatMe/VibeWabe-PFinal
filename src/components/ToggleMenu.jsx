import React from 'react';

const ToggleMenu = ({ isOpen, toggleOpen }) => {
  return (
    <button
      onClick={toggleOpen}
      className="flex justify-center items-center gap-4 bg-[#1c1c1c] w-1/7 p-5 shadow-md rounded-3xl cursor-pointer transition-all duration-300"
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      {/* Íconos con transición */}
      <span
        className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? '✕' : '☰'}
      </span>
    </button>
  );
};

export default ToggleMenu;
