import React, { useState } from 'react';
import { useDevice } from "./hooks/useDevice";
import HeaderMenu from './components/HeaderMenu';
import SectionMusic from './components/SectionMusic';
import MusicPlayer from './components/MusicPlayer';
import PhoneMenu from './components/PhoneMenu';
import AsideMenu from './components/AsideMenu';

function Layout() {
    const { isOpen, toggleOpen } = useDevice();
    const [currentSongIndex, setCurrentSongIndex] = useState(null); // Mejor usar null

    return (
        <div className="flex">
            <AsideMenu isOpen={isOpen} />
            <div className="flex flex-col w-full items-center">
                <HeaderMenu isOpen={isOpen} toggleOpen={toggleOpen} />
                <SectionMusic onSelectSong={setCurrentSongIndex} />
            </div>
            <div className="flex flex-col">
                <MusicPlayer currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
                <PhoneMenu />
            </div>
        </div>
    );
}

export default Layout;
