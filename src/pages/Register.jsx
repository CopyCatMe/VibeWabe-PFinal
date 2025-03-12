import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);

      // Mostrar indicador de carga
      setLoading(true);

      // Retraso de 2 segundos antes de navegar
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);

    } catch {
      setError("Error al registrarse. Inténtalo de nuevo.");
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && (
        <div className="h-screen flex items-center justify-center ">
          <img className="animate-pulse m-auto mt-[10%]" src="logo.png" alt="Loading..." />
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1c1c1c] to-[#131313] text-white flex-col">
        {/* Imagen encima del formulario */}
        <img className=" h-80 w-80 mt-[-250px]" src="logo.png" alt="Loading..." />

        <div className="bg-[#2E2E2E] p-8 rounded-2xl shadow-lg w-98">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 bg-[#3C3C3C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C6C6C]"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 bg-[#3C3C3C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C6C6C]"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 bg-[#3C3C3C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C6C6C]"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF5733] hover:bg-[#ff7e33] text-white py-2 rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-[#ff623f] hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

