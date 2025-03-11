import React, { useEffect, useState } from 'react';
import { useDevice } from "./hooks/useDevice";
import AsideMenu from './components/asideMenu';
import HeaderMenu from './components/HeaderMenu';
import SectionMusic from './components/SectionMusic';
import MusicPlayer from './components/MusicPlayer';
import PhoneMenu from './components/PhoneMenu';
import { useNavigate } from 'react-router-dom';

function Layout() {
    const navigate = useNavigate();
    const { isOpen, toggleOpen } = useDevice();
    const [currentSongIndex, setCurrentSongIndex] = useState(false);
    const handleSelectSong = (index) => setCurrentSongIndex(index);

    // PRUEBA LOGIN
    const isAuthenticated = true;
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    })

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
};

export default Layout;

