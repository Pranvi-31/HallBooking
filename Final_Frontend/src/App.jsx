import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Bookings from "./components/Booking";
import Navbar from "./components/Navbar";
import AdminPanel from "./components/AdminPanel";
import AddBooking from "./components/AddBooking";
import AuthGuard from "./context/AuthGaurd.jsx";

const ProtectedRoute = ({ children }) => {
  const { authToken, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } else if (isAdmin) {
      console.log("isAdmin", isAdmin)
      navigate("/admin");
    }
  }, [authToken, isAdmin, navigate]);

  return authToken ? children : <Navigate to="/login" />;
};

const NavBarCustom = () => {
  const { isAdmin } = useAuth();
  return (!isAdmin ? <Navbar /> : <div></div>);
}

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <NavBarCustom />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <AuthGuard>
                    <Home />
                  </AuthGuard>
                } />
                <Route path="/login" element={
                  <AuthGuard><Login />
                  </AuthGuard>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/addbooking" element={<AuthGuard><AddBooking /></AuthGuard>} />
                <Route path="/bookings" element={
                  <ProtectedRoute>
                    <AuthGuard>
                    <Bookings />
                      </AuthGuard>
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <AuthGuard>
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                    </AuthGuard>
                } />
              </Routes>
            </main>
          </div>
          <footer className="bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText py-6">
            <div className="container mx-auto flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center">
                <p>&copy; 2024 - All rights reserved by Pranvi Rai</p>
              </div>
            </div>
          </footer>
        </Router>
      </AuthProvider>
  );
};

export default App;
