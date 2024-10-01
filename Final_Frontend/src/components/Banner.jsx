import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import lnmiit from '../assets/lnmiit.jpg';

const Banner = () => {
    const navigate = useNavigate();
    const { authToken } = useAuth();

    const handleBookNow = () => {
        if (authToken) {
            navigate('/addbooking');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 flex flex-col md:flex-row my-10">
            <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
                <div className="space-y-8">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        HALL BOOKING PORTAL OF{' '}
                        <span className="text-pink-500">LNMIIT</span>
                    </h1>
                    <p className="text-sm md:text-xl">
                        Welcome to the Hall Booking Portal of the LNM Institute of Information Technology, Jaipur.
                    </p>
                </div>
                <button
                    onClick={handleBookNow}
                    className="text-white mt-8 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Book now
                </button>
            </div>
            <div className="order-1 w-full mt-20 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
                <img
                    src={lnmiit}
                    className="w-full md:w-[550px] h-auto md:h-[460px] rounded-2xl object-cover"
                    alt="LNMIIT"
                />
            </div>
        </div>
    );
};

export default Banner;
