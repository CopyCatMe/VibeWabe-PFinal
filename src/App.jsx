import AsideMenu from "./components/asideMenu";
import HeaderMenu from "./components/HeaderMenu";
import React, { useState } from 'react';
import MusicPlayer from "./components/MusicPlayer";



function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      <AsideMenu isOpen={isOpen} />
      <HeaderMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <MusicPlayer isOpen={isOpen}/>
    </div>
  );
}

export default App;