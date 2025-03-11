import React from 'react';
import { Search, User } from 'lucide-react';
import ToggleMenu from './ToggleMenu';

function HeaderMenu({ isOpen, toggleOpen }) {
  return (
    <nav className={`hidden md:flex items-center justify-between p-5 w-full h-15 m-3 transition-all duration-300 ${isOpen ? '' : 'ml-[-230px]'}`}>
      <ToggleMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className="relative w-7/7 m-2">
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="rounded-3xl bg-[#2c2c2c] text-white pl-13 p-4.5 w-full text-sm"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
      </div>
      <div className="flex justify-center items-center bg-[#1c1c1c] w-full sm:w-2/5 md:w-1/4 lg:w-1/7 p-4 sm:p-5 shadow-md rounded-3xl">
        <img src="menu/perfil.png" alt="Perfil" className="w-5 h-5 mr-3 rounded-full border-2 border-gray-600" />
        <span className="text-white text-xs">Login</span>
      </div>
    </nav>
  );
};

export default HeaderMenu;

