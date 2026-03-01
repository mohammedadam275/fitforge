import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    const res = await API.post("/auth/login", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.token);

    const userRes = await API.get("/auth/me");
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};