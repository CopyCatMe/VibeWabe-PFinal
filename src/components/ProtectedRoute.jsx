import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth"; // Suponiendo que tienes este hook para gestionar la autenticación
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir a la página de login
    return loading ? <div><img className="animate-pulse m-auto mt-[10%] " src="logo.png" alt="" /></div> : <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
