import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");

    const login = (token) => {
        setAuthToken(token);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setAuthToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
