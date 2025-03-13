import { useState } from "react";
import ModalAdd from "./ModalAdd";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", img: "/menu/home.png", url: "/" },
  { name: "Add", img: "/menu/add.png" },
  { name: "Favorites Songs", img: "/menu/playlist.png", url: "/favorites" },
  { name: "My Songs", img: "/menu/songs.png", url: "/mysongs"},
  { name: "Artist", img: "/menu/artist.png", url: "/artist" },
];

function PhoneMenu() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (item.name === "Add") {
      setIsModalOpen(true);
    } else if (item.name === "Logout") {
      logout();
    } else (
      navigate(item.url)
    )
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón flotante */}
      <div
        className={`md:hidden fixed bottom-36 right-4 ${isOpen ? "bg-[#585858]" : "bg-[#ff6449]"
          } px-6 py-6 rounded-full z-20 cursor-pointer shadow-lg hover:scale-110 transition-all duration-300`}
        onClick={toggleMenu}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <div className="w-5 h-1 bg-white rounded-full mb-1"></div>
            <div className="w-5 h-1 bg-white rounded-full mb-1"></div>
            <div className="w-5 h-1 bg-white rounded-full"></div>
          </>
        )}
      </div>

      {/* Menú flotante */}
      <nav
        className={`fixed bottom-55 right-5 w-64 bg-[#161616] bg-opacity-90 backdrop-blur-md p-4 shadow-xl rounded-2xl transition-all duration-300 ease-in-out md:hidden z-50
          ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col items-center space-y-4">
          {menu.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center px-6 py-3 w-full rounded-lg cursor-pointer transition-all duration-300 ${
                window.location.pathname === item.url ? "bg-[#ff6347]" : "bg-[#242424]"
              } hover:bg-[#3B3C40] hover:scale-105 shadow-md transform`}
            >
              <img src={item.img} alt={item.name} className="w-6 h-6 mr-3" />
              <span className="text-white font-medium text-sm">{item.name}</span>
            </div>
          ))}
          {isAuthenticated && (
            <div
              onClick={logout}
              className="flex items-center px-6 py-3 w-full rounded-lg cursor-pointer transition-all duration-300 bg-[#242424] hover:bg-[#3B3C40] hover:scale-105 shadow-md transform"
            >
              <img src={user.avatar_url} alt="Perfil" className="w-6 h-6 mr-3 rounded-full border-2 border-gray-600" />
              <span className="text-white font-medium text-sm">Logout</span>
            </div>
          )}
        </div>
      </nav>

      {/* Modal de agregar canción */}
      {isModalOpen && <ModalAdd toggleModal={() => setIsModalOpen(false)} />}
    </>
  );
}

export default PhoneMenu;
