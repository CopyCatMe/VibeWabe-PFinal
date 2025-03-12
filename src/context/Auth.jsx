import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
      fetch(import.meta.env.VITE_API_URL + "/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
        },
        body: JSON.stringify({ idUser: userToken }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
          }
          return response.json();
        })
        .then(({ body }) => {
          setUser(body);
          setIsAuthenticated(true);
        })
        .catch(() => {
          toast.error("Failed to authenticate the user.", { style: { backgroundColor: "#333", color: "#fff" } });
          logout();
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Verificar si el error es por una contraseña incorrecta
        const errorResponse = await response.json();
        if (errorResponse.message === "Invalid password") {
          toast.error("The password is incorrect", { style: { backgroundColor: "#333", color: "#fff" } });
        } else {
          toast.error(`Login failed: ${errorResponse.message}`, { style: { backgroundColor: "#333", color: "#fff" } });
        }
        return;
      }

      const { body } = await response.json();
      setUser(JSON.parse(body.userData));
      setIsAuthenticated(true);
      localStorage.setItem("user", body.loginToken);
      toast.success("Login successful!", { style: { backgroundColor: "#333", color: "#fff" } });
    } catch (error) {
      toast.error("Login failed. Please try again.", { style: { backgroundColor: "#333", color: "#fff" } });
    }
  };


  const register = async (email, password, name) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const { body } = await response.json();
      setUser(JSON.parse(body.userData));
      setIsAuthenticated(true);
      localStorage.setItem("user", body.loginToken);
      toast.success("Registration successful!", { style: { backgroundColor: "#333", color: "#fff" } });
    } catch (error) {
      toast.error("Error during registration", { style: { backgroundColor: "#333", color: "#fff" } });
    }
  };

  const updateUserData = async (field, value) => {
    try {
      const savedUser = getSavedUser();
      if (!savedUser) throw new Error("Usuario no autenticado");

      const response = await fetch(import.meta.env.VITE_API_URL + `/api/auth/config/${field}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
        },
        body: JSON.stringify({ [field]: value, id_usuario: savedUser.id_usuario }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      toast.success(`${field} updated successfully`, { style: { backgroundColor: "#333", color: "#fff" } });
      setUser((prevUser) => ({ ...prevUser, [field]: value }));
    } catch (error) {
      toast.error(`Error updating ${field}: ${error.message}`, { style: { backgroundColor: "#333", color: "#fff" } });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast("Log out successful!", { icon: "👋", style: { backgroundColor: "#333", color: "#fff" } });
  };

  const getSavedUser = () => {
    const userToken = localStorage.getItem("user");
    return userToken ? JSON.parse(userToken) : null;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        updateEmail: (email) => updateUserData("email", email),
        updateName: (name) => updateUserData("name", name),
        updatePassword: (password) => updateUserData("password", password),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

