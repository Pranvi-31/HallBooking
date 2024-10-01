import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

    useEffect(() => {
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            }
        }
    }, [authToken]);

    const login = (token, adminStatus) => {
        setAuthToken(token);
        setIsAdmin(adminStatus);
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", adminStatus);
    };

    const logout = () => {
        setAuthToken("");
        setIsAdmin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
    };

    return (
        <AuthContext.Provider value={{ authToken, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
