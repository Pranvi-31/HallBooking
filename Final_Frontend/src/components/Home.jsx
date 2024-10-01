import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lnmiit1 from "../assets/lnmiit.jpg";
import lnmiit2 from "../assets/lnmiit1.jpg";
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleBookNow = () => {
        navigate("/addbooking");
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <div className="vector-designs">
                <div className="circle1"></div>
                <div className="circle2"></div>
            </div>

            <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 md:px-20 flex flex-col md:flex-row my-10 space-y-10 md:space-y-0">
                <div className="w-full order-2 md:order-1 md:w-1/2 mt-8 md:mt-36 relative z-10">
                    <div className="space-y-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
                            HALL BOOKING PORTAL OF
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8e44ad] to-[#8e44ad]"> LNMIIT</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-2xl text-gray-300 leading-relaxed">
                            Welcome to the Hall Booking Portal of the LNM Institute of Information Technology, Jaipur.
                        </p>
                    </div>
                    <button
                        onClick={handleBookNow}
                        className="text-white bg-[#8e44ad] hover:bg-[#6a0dad] focus:ring-4 focus:ring-[#8e44ad] font-medium rounded-lg text-sm px-4 py-2.5 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-5"
                    >
                        Book Now
                    </button>
                </div>
                <div
                    className="order-1 w-full mt-0 md:mt-0 md:w-1/2 flex justify-center md:justify-end relative z-10"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={lnmiit1}
                        className={`w-full md:w-[420px] h-auto md:h-[370px] rounded-2xl border border-gray-300 shadow-lg object-cover transition duration-300 ease-in-out transform hover:scale-105 ${isHovered ? 'z-0 opacity-80' : 'z-10'}`}
                        alt="LNMIIT"
                    />
                    <img
                        src={lnmiit2}
                        className={`w-full md:w-[420px] h-auto md:h-[370px] rounded-2xl border border-gray-300 shadow-lg object-cover transition duration-300 ease-in-out transform hover:scale-105 absolute top-10 right-12 ${isHovered ? 'z-10' : 'z-0 opacity-80'}`}
                        alt="LNMIIT Aerial View"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
