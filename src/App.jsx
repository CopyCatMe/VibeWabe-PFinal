import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout.jsx';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>  
    <div><Toaster/></div>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
    </Routes>
    </>

  );
}

export default App;
