import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import ToggleMenu from "./ToggleMenu";
import { useAuth } from "../context/Auth";
import { getSongsByName } from "../lib/data";

function HeaderMenu({ isOpen, toggleOpen, setSongs }) { // Asegúrate de que setSongs esté en las props
  const { isAuthenticated, logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`hidden md:flex items-center justify-between p-5 w-full h-15 m-3 transition-all duration-300 ${
        isOpen ? "" : "ml-[-230px]"
      }`}
    >
      <ToggleMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className="relative w-6/7 m-2">
        <input
          type="text"
          onChange={(e) => {
            getSongsByName(e.target.value).then((body) => {
              setSongs(body); // Asegúrate de que setSongs esté definida
            });
          }}
          placeholder="What do you want to listen to?"
          className="rounded-3xl bg-[rgb(44,44,44)] text-white pl-13 p-4.5 w-full text-sm"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
      </div>

      {isAuthenticated ? (
        <div
          className="flex justify-center items-center cursor-pointer bg-[#1c1c1c] w-full sm:w-2/5 md:w-1/4 lg:w-1/7 p-3.5 sm:p-3.5 shadow-md rounded-3xl"
          onClick={handleDropdownToggle}
        >
          <img
            src={user.avatar_url}
            alt="Perfil"
            className="w-7 mr-3 rounded-full border-2 border-gray-600"
          />
          <span className="text-white">{user.name}</span>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
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