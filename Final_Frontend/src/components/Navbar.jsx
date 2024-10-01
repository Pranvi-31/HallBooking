import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaClipboardList, FaSignOutAlt, FaBars, FaTimes, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
    const { authToken, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
            <div className="flex items-center justify-between w-full lg:w-auto">
                <Link to="/" className="text-white text-lg font-semibold flex items-center">
                    <FaHome className="mr-2 text-[#8e44ad]" />
                    Home
                </Link>
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-white focus:outline-none ml-2"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            <div className={`lg:flex lg:items-center lg:space-x-8 ${isOpen ? 'block' : 'hidden'} lg:block transition-all duration-300 ease-in-out`}>
                {authToken && (
                    <Link
                        to="/bookings"
                        className="block mt-4 lg:inline-block lg:mt-0 text-lg font-semibold hover:text-[#6a0dad] flex items-center"
                    >
                        <FaClipboardList className="mr-2 text-[#6a0dad]" />
                        Bookings
                    </Link>
                )}
                {!authToken ? (
                    <>
                        <Link
                            to="/login"
                            className="block mt-4 lg:inline-block lg:mt-0 text-lg font-semibold hover:text-[#6a0dad] flex items-center"
                        >
                            <FaSignInAlt className="mr-2 text-[#6a0dad]" />
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="block mt-4 lg:inline-block lg:mt-0 text-lg font-semibold hover:text-[#6a0dad] flex items-center"
                        >
                            <FaUserPlus className="mr-2 text-[#6a0dad]" />
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="block mt-4 lg:inline-block lg:mt-0 text-lg font-semibold hover:text-[#6a0dad] flex items-center"
                    >
                        <FaSignOutAlt className="mr-2 text-[#6a0dad]" />
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
