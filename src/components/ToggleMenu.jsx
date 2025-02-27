import { Menu, X } from "lucide-react";

const ToggleMenu = ({ isOpen, toggleOpen }) => {
  return (
    <button
      className="hidden justify-center items-center gap-1 bg-[#1c1c1c] w-25 h-15 p-1 shadow-md rounded-3xl cursor-pointer transition-all duration-300 md:flex"
      onClick={toggleOpen}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      {/* Íconos con transición */}
      <span
        className={`transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </span>
    </button>
  );
};

export default ToggleMenu;
