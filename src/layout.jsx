import React from 'react';
import { Outlet } from 'react-router-dom'; // ✅ Importar Outlet
import HeaderMenu from './components/HeaderMenu';
import MusicPlayer from './components/MusicPlayer';
import PhoneMenu from './components/PhoneMenu';
import AsideMenu from './components/AsideMenu';

function Layout({ toggleOpen, currentSongId, isOpen, setSongs, songs, setCurrentSongId, audioRef }) {
    const stopCurrentSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setCurrentSongIndex(null);
        }
    };

    return (
        <div className="flex">
            <AsideMenu isOpen={isOpen} setSongs={setSongs} />
            <div className="flex flex-col w-full items-center">
                <HeaderMenu isOpen={isOpen} toggleOpen={toggleOpen} setSongs={setSongs} stopCurrentSong={stopCurrentSong} />
                <Outlet  />  
            </div>
            <div className="flex flex-col">
                <MusicPlayer songs={songs} isOpen={isOpen} currentSongId={currentSongId} setCurrentSongId={setCurrentSongId} audioRef={audioRef} setSongs={setSongs} />
                <PhoneMenu />
            </div>
        </div>
    );
}

export default Layout;
