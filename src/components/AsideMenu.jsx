import { useState } from "react";
import ModalAdd from "./ModalAdd"; // Importamos el modal
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", img: "/menu/home.png", url: "/" },
  { name: "Add", img: "/menu/add.png" },
  { name: "Favorites Songs", img: "/menu/playlist.png", url: "/favorites" },
  { name: "My Songs", img: "/menu/songs.png", url: "/mysongs"},
  { name: "Artist", img: "/menu/artist.png", url: "/artist" },
];

function AsideMenu({ isOpen, setSongs }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir/cerrar el modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const navigate = useNavigate();

  return (
    <>
      {/* Menú lateral */}
      <aside
        className={`bg-[#1E1E1E] h-[calc(100vh-30px)] rounded-3xl m-3 mr-0 
        transition-all duration-300 
        ${isOpen ? "translate-x-0 visible opacity-100" : "-translate-x-full invisible "}
        hidden md:block`}
      >
        <div className="h-full w-[230px] flex flex-col p-4">
          {/* Logo */}
          <div className="h-auto w-35 mx-auto mb-5 cursor-pointer" onClick={() => navigate("/")}>
            <img src="logo.png" alt="logo" />
          </div>
          {/* Menú */}
          <nav className="flex flex-col space-y-4">
            {menu.map((item, index) => (
              <div
                key={index}
                className={`flex flex-row items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-[#3B3C40] hover:font-bold transition-all duration-300 ${
                  window.location.pathname === item.url ? "bg-[#ff6347] font-bold" : ""
                }`}
                onClick={
                  item.name === "Add"
                    ? toggleModal
                    : () => navigate(item.url)
                }
              >
                <img src={item.img} alt={item.name} className="w-5 h-5" />
                <h2 className="text-white ml-3">{item.name}</h2>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Modal */}
      {isModalOpen && <ModalAdd setSongs={setSongs} toggleModal={toggleModal} />}
    </>
  );
}

export default AsideMenu;
