import { useState } from "react";
import ModalAdd from "./ModalAdd";

const menu = [
  { name: "Add", img: "/menu/add.png" },
  { name: "Playlists", img: "/menu/playlist.png" },
  { name: "My Songs", img: "/menu/songs.png" },
  { name: "Artists", img: "/menu/artist.png" },
];

function PhoneMenu({ isAuthenticated, user, logout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuClick = (itemName) => {
    if (itemName === "Add") {
      setIsModalOpen(true);
    } else if (itemName === "Logout") {
      logout();
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      {/* Botón flotante */}
      <div
        className={`md:hidden fixed bottom-35 right-6 ${isOpen ? "bg-[#585858]" : "bg-[#ff6449]"
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
              onClick={() => handleMenuClick(item.name)}
              className="flex items-center px-6 py-3 w-full rounded-lg cursor-pointer transition-all duration-300 bg-[#242424] hover:bg-[#3B3C40] hover:scale-105 shadow-md transform"
            >
              <img src={item.img} alt={item.name} className="w-6 h-6 mr-3" />
              <span className="text-white font-medium text-sm">{item.name}</span>
            </div>
          ))}
          {isAuthenticated ? (
            <div
              className="relative flex justify-center items-center cursor-pointer bg-[#1c1c1c] w-full p-3.5 shadow-md rounded-3xl"
              onClick={handleDropdownToggle}
            >
              <img
                src={user.avatar_url}
                alt="Perfil"
                className="w-7 mr-3 rounded-full border-2 border-gray-600"
              />
              <span className="text-white">{user.name}</span>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-5 top-15 mt-2 bg-[#1c1c1c] text-white rounded-lg shadow-lg w-32 p-2">
                  <div
                    onClick={logout}
                    className="cursor-pointer hover:text-red-600 p-2 rounded-lg duration-500"
                  >
                    Log out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => handleMenuClick("Login")}
              className="flex items-center px-6 py-3 w-full rounded-lg cursor-pointer transition-all duration-300 bg-[#242424] hover:bg-[#3B3C40] hover:scale-105 shadow-md transform"
            >
              <img src="/menu/login.png" alt="Login" className="w-6 h-6 mr-3" />
              <span className="text-white font-medium text-sm">Login</span>
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
