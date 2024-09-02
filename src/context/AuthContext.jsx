// app/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loader, setLoader] = useState(true);
  
  const logout = () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refToken")
      localStorage.removeItem("username")
      localStorage.removeItem("userVerificationStatus")
      setIsAuthenticated(false);
  }

  const login = (accessToken, refToken, username) => {
      localStorage.setItem("accessToken",accessToken)
      localStorage.setItem("refToken",refToken)
      localStorage.setItem("username",username)
      setIsAuthenticated(true);
  }

  const setloader = (value) => {
    setLoader(value)
  }
  
  useEffect(() => {
    // Check if user is already logged in and parse user data
    const refToken = localStorage.getItem("refToken");
    if (refToken) {
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);}
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated,loader,logout,login,setloader }}>
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