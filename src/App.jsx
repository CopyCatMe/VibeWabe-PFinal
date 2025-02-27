import React, { useState, useEffect } from 'react';
import AsideMenu from "./components/AsideMenu";
import HeaderMenu from "./components/HeaderMenu";
import MusicPlayer from "./components/MusicPlayer";
import SectionMusic from "./components/SectionMusic";

function App() {
  const [isOpen, setIsOpen] = useState(true);  // El menú comienza abierto por defecto
  const [currentSongIndex, setCurrentSongIndex] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  const toggleOpen = () => setIsOpen(!isOpen);  // Función para alternar el menú

  const handleSelectSong = (index) => {
    setCurrentSongIndex(index);  // Función para seleccionar la canción
  };

  // Función para detectar el tamaño de la pantalla
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);  // Si es móvil, setIsMobile a true
      setIsOpen(true);  // En pantallas pequeñas, el menú siempre está abierto
    } else {
      setIsMobile(false);  // Si no es móvil, setIsMobile a false
      setIsOpen(false);  // En pantallas grandes, el menú se cierra
    }
  };

  // Usamos useEffect para configurar el listener de resize al inicio y limpiar cuando se desmonta el componente
  useEffect(() => {
    handleResize();  // Llamamos a handleResize para hacer la verificación inicial
    window.addEventListener('resize', handleResize);  // Añadimos el listener de resize

    return () => {
      window.removeEventListener('resize', handleResize);  // Limpiamos el listener cuando el componente se desmonta
    };
  }, []); // Solo se ejecuta al montar el componente

  return (
    <div className="flex">
      <AsideMenu isOpen={isOpen} />
      <div className="flex flex-col w-full items-center">
        <HeaderMenu isOpen={isOpen} toggleOpen={toggleOpen} />
        <SectionMusic isOpen={isOpen} onSelectSong={handleSelectSong} />
      </div>
      <MusicPlayer
        isOpen={isOpen}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
      />
    </div>
  );
}

export default App;
