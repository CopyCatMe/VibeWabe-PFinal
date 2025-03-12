import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-8">Page Not Found</h2>
      <p className="text-center text-lg">
        Lo sentimos, la página que estás buscando no existe. Puedes regresar al{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          inicio
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFoundPage;

