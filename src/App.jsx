import AsideMenu from "./components/AsideMenu";
import HeaderMenu from "./components/HeaderMenu";
import React, { useState } from 'react';
import MusicPlayer from "./components/MusicPlayer";
import SectionMusic from "./components/SectionMusic";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      <AsideMenu isOpen={isOpen} />
      <div className="flex flex-col w-full items-center">
      <HeaderMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <SectionMusic isOpen={isOpen} />
      </div>
      <MusicPlayer isOpen={isOpen} />
    </div>
  );
}

export default App;
