import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useEffect, useState } from "react";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div>
        <img className="animate-pulse m-auto mt-[10%]" src="logo.png" alt="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; 
}

export default ProtectedRoute;
