// app/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const logout = () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refToken")
      setIsAuthenticated(false);
  }

  const login = (accessToken, refToken, username) => {
      localStorage.setItem("accessToken",accessToken)
      localStorage.setItem("refToken",refToken)
      localStorage.setItem("username",username)
      setIsAuthenticated(true);
  }

  useEffect(() => {
    // Check if user is already logged in and parse user data

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated,logout,login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};