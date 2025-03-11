import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
