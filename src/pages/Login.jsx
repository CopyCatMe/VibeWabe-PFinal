import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData.email, formData.password);

      // Mostrar un indicador de carga
      setLoading(true);

      // Retraso de 2 segundos antes de navegar
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);

    } catch {
      setError("Correo o contraseña incorrectos.");
    }
  };
  const [loading, setLoading] = useState(false);

  return (
    <>{loading && (
      <div className="h-screen flex items-center justify-center ">
        <img className="animate-pulse m-auto mt-[10%]" src="logo.png" alt="Loading..." />
      </div>
    )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1c1c1c] to-[#131313] text-white flex-col">
        {/* Imagen encima del formulario */}
        <img className=" h-80 w-80 mt-[-300px]" src="logo.png" alt="Loading..."/>

        <div className="bg-[#2E2E2E] p-8 rounded-2xl shadow-lg w-98">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email Address</label>
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
              Sign In
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-[#ff623f] hover:underline">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;


