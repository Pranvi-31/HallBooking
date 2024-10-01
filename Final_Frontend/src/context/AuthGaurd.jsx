import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useAuth } from "./AuthContext";

const AuthGuard = ({ children }) => {
    const { authToken, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            try {
                const decodedToken = jwtDecode(authToken);
                console.log("isAdmin", isAdmin)
                console.log("window.location.pathname", window.location.pathname)
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                    navigate("/");
                }
                else if(!isAdmin && window.location.pathname === '/admin'){
                    navigate("/");
                }
                else if (isAdmin && window.location.pathname !== '/admin') {
                    navigate("/admin");
                }
            } catch (error) {
                logout();
                navigate("/");
            }
        }
    }, [authToken, isAdmin, logout, navigate]);

    return children;
};

export default AuthGuard;
