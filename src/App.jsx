import React, { useState } from 'react';
import { useDevice } from "./hooks/useDevice";
import HeaderMenu from "./components/HeaderMenu";
import MusicPlayer from "./components/MusicPlayer";
import SectionMusic from "./components/SectionMusic";
import PhoneMenu from './components/PhoneMenu';
import AsideMenu from './components/asideMenu';

function App() {
  const { isOpen, toggleOpen } = useDevice();
  const [currentSongIndex, setCurrentSongIndex] = useState(false);

  const handleSelectSong = (index) => setCurrentSongIndex(index);

  return (
    <div className="flex">
      <AsideMenu isOpen={isOpen} />
      <div className="flex flex-col w-full items-center">
        <HeaderMenu isOpen={isOpen} toggleOpen={toggleOpen} />
        <SectionMusic isOpen={isOpen} onSelectSong={handleSelectSong} />
      </div>
      <div className="flex flex-col">
        <MusicPlayer isOpen={isOpen} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
        <PhoneMenu isOpen={isOpen} />
      </div>
    </div>
  );
}

export default App;
