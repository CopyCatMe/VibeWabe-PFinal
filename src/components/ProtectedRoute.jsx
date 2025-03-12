import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';  // Suponiendo que tienes este hook para gestionar la autenticación

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir a la página de login
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
