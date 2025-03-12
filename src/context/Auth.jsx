import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const apiRequest = async (endpoint, data, method = "POST") => {
  try {
    console.log(data)
    const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return response.json();
  } catch (error) {
    toast.error(`API Error: ${error.message}`);
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      apiRequest("/api/auth", { idUser: localStorage.getItem("user") })
        .then(({ body }) => {
          setUser(body);

        })
        .catch(() => {
          toast.error("Failed to authenticate the user.");
          logout();
        });
    }
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      const { body } = await apiRequest("/api/auth/login", { email, password });
      const userData = body.userData;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", body.loginToken);
      toast.success("Login successful!");
    } catch {
      toast.error("Login failed");
    }
  };

  const register = async (email, password, name) => {
    try {
      const { body } = await apiRequest("/api/auth/register", { email, password, name });
      const userData = body.userData;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", body.loginToken);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Error during registration");
    }
  };

  const updateUserData = async (field, value) => {
    try {
      const savedUser = getSavedUser();
      if (!savedUser) throw new Error("Usuario no autenticado");

      await apiRequest(`/api/auth/config/${field}`, { [field]: value, id_usuario: savedUser.id_usuario });
      toast.success(`${field} updated successfully`);
      setUser((prevUser) => ({ ...prevUser, [field]: value }));
    } catch (error) {
      toast.error(`Error updating ${field}: ${error.message}`);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast("Log out successful!", { icon: "👋" });
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
