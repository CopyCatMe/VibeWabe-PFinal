import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout.jsx";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import SectionMusic from "./components/SectionMusic.jsx";
import { useDevice } from "./hooks/useDevice.jsx";
import { useAuth } from "./context/Auth.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { getSongs } from "./lib/data.js";

function App() {
  const { user } = useAuth();
  const { isOpen, toggleOpen } = useDevice();
  const [currentSongId, setCurrentSongId] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs().then((body) => {
      setSongs(body);
    });
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* Layout será el contenedor de las rutas protegidas */}
          <Route
            path="/"
            element={
              <Layout
                toggleOpen={toggleOpen}
                isOpen={isOpen}
                songs={songs}
                setSongs={setSongs}
                currentSongId={currentSongId}
                setCurrentSongId={setCurrentSongId}
              />
            }
          >
            {/* ✅ Ruta raíz ("/") -> Se renderiza dentro de <Layout /> */}
            <Route
              index
              element={
                <SectionMusic
                  title="Recently Added"
                  isOpen={isOpen}
                  onSelectSong={(id) => setCurrentSongId(id)} // Pasa el ID correctamente
                  songs={songs}
                />
              }
            />
            {/* ✅ Ruta "/mysongs" -> También se renderiza dentro de <Layout /> */}
            <Route
              path="mysongs"
              element={
                <SectionMusic
                  title="My songs"
                  isOpen={isOpen}
                  onSelectSong={(id) => setCurrentSongId(id)} // Pasa el ID correctamente
                  songs={songs.filter((song) => song.userName === user?.name)} // Filtra por el nombre del usuario
                />
              }
            />
            {/* ✅ Ruta "/favorites" -> También se renderiza dentro de <Layout /> */}
            <Route
              path="favorites"
              element={
                <SectionMusic
                  title="Favorites"
                  isOpen={isOpen}
                  onSelectSong={(id) => setCurrentSongId(id)} // Pasa el ID correctamente
                  songs={songs.filter((song) => song.likedBy?.includes(user?.name))} // Filtra por los usuarios que le dieron like
                />
              }
            />
            {/* ✅ Ruta "/favorites" -> También se renderiza dentro de <Layout /> */}
            <Route
              path="most-liked-songs"
              element={
                <SectionMusic
                  title="Most Liked Songs"
                  isOpen={isOpen}
                  onSelectSong={(id) => setCurrentSongId(id)} // Pasa el ID correctamente
                  songs={songs.filter((song) => song.likes > 0).sort((a, b) => b.likes - a.likes)}
                />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;