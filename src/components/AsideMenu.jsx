import { useState } from "react";

// Lista de menús (como ejemplo)
const menu = [
  { name: "Add", img: "/menu/add.png" },
  { name: "Playlists", img: "/menu/playlist.png" },
  { name: "Songs", img: "/menu/songs.png" },
  { name: "Albums", img: "/menu/album.png" },
  { name: "Artists", img: "/menu/artist.png" },
];

function AsideMenu({ isOpen }) {
  return (
    <aside
      className={`bg-[#1E1E1E] h-[calc(100vh-30px)] rounded-3xl m-3 mr-0 
        transition-all duration-300 
        ${isOpen ? "translate-x-0 visible opacity-100" : "-translate-x-full invisible "}`}
    >
      <div className="h-full w-[230px] flex flex-col p-4">
        {/* Logo */}
        <img src="logo.png" alt="logo" className="h-auto w-35 mx-auto mb-5" />
        {/* Menú */}
        <nav className="flex flex-col space-y-4">
          {menu.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-[#3B3C40] hover:font-bold transition-all duration-300"
            >
              <img src={item.img} alt={item.name} className="w-5 h-5" />
              <h2 className="text-white ml-3">{item.name}</h2>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default AsideMenu;
