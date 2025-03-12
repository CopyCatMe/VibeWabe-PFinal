import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import ToggleMenu from "./ToggleMenu";
import { useAuth } from "../context/Auth"; // Importa el contexto de autenticación

function HeaderMenu({ isOpen, toggleOpen }) {
  const { isAuthenticated, logout, user } = useAuth(); // Obtiene el estado de autenticación y la función de logout
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para el dropdown del menú
  const dropdownRef = useRef(null); // Referencia al dropdown para detectar clics fuera de él

  // Función para manejar el toggle del dropdown
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Cerrar el dropdown si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Agregar el event listener cuando el componente se monta
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`hidden md:flex items-center justify-between p-5 w-full h-15 m-3 transition-all duration-300 ${isOpen ? "" : "ml-[-230px]"
        }`}
    >
      <ToggleMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className="relative w-6/7 m-2">
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="rounded-3xl bg-[rgb(44,44,44)] text-white pl-13 p-4.5 w-full text-sm"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
      </div>

      {isAuthenticated ? (
        <div
          className=" flex justify-center items-center cursor-pointer bg-[#1c1c1c] w-full sm:w-2/5 md:w-1/4 lg:w-1/7 p-3.5 sm:p-3.5 shadow-md rounded-3xl"
          onClick={handleDropdownToggle} // Cambiar a onClick para que se despliegue al hacer clic
        >
          <img
            src={user.avatar_url}
            alt="Perfil"
            className="w-7 mr-3 rounded-full border-2 border-gray-600"
          />
          <span className="text-white">{user.name}</span>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef} // Asignar la referencia al dropdown
              className="absolute right-5 top-16 mt-2 bg-[#1c1c1c] text-white rounded-3xl shadow-lg w-32 p-2"
            >
              <div
                onClick={logout}
                className="cursor-pointer hover:text-red-600 p-2 rounded-lg duration-500"
              >
                Log out
              </div>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
}

export default HeaderMenu;
