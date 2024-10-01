import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './Home.css'; 
import './customStyles.css';

const AddBooking = () => {
    const [hall, setHall] = useState("LT1");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("11:00");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { authToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                "http://localhost:3000/api/bookings",
                { hall, date, slot: `${startTime}-${endTime}`, notes },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            navigate("/bookings");
            setMessage("Booking request is successful");
        } catch (error) {
            setMessage("Booking request failed!");
        } finally {
            setLoading(false);
        }
    };

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 9; hour < 18; hour++) {
            const hourStr = hour < 10 ? `0${hour}` : hour;
            times.push(`${hourStr}:00`);
            times.push(`${hourStr}:30`);
        }
        return times;
    };

    const isEndTimeValid = () => {
        const start = parseInt(startTime.replace(":", ""), 10);
        const end = parseInt(endTime.replace(":", ""), 10);
        return end > start;
    };

    return (

            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-center md:text-5xl lg:text-6xl text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8e44ad] to-[#8e44ad]">
                        LNMIIT
                    </span>{" "}
                    Hall Booking Portal
                </h1>
                <p className="text-lg font-normal text-[#d4d4ff] lg:text-xl mb-8 text-center">
                    Seamlessly book halls at LNMIIT with our user-friendly portal.
                </p>

                <form
                className="bg-[#3e2847] p-8 rounded-lg shadow-xl w-full max-w-md"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="hall" className="block text-sm font-medium text-[#d4d4ff]">
                            Hall
                        </label>
                        <select
                            id="hall"
                            value={hall}
                            onChange={(e) => setHall(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-[#3e3e5f] bg-[#1a1a1a] text-[#d4d4ff] rounded-md shadow-sm focus:outline-none focus:ring-[#8e44ad] focus:border-[#8e44ad] sm:text-sm"
                        >
                            {[...Array(19).keys()].map((num) => (
                                <option key={num} value={`LT${num + 1}`}>{`LT${num + 1}`}</option>
                            ))}
                        </select>
                    </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-[#d4d4ff]">
                        Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-[#3e3e5f] bg-[#1a1a1a] text-[#d4d4ff] rounded-md shadow-sm focus:outline-none focus:ring-[#8e44ad] focus:border-[#8e44ad] sm:text-sm custom-date-input"
                    />
                </div>

                    <div className="mb-4">
                        <label htmlFor="startTime" className="block text-sm font-medium text-[#d4d4ff]">
                            Start Time
                        </label>
                        <select
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-[#3e3e5f] bg-[#1a1a1a] text-[#d4d4ff] rounded-md shadow-sm focus:outline-none focus:ring-[#8e44ad] focus:border-[#8e44ad] sm:text-sm"
                        >
                            {generateTimeOptions().map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="endTime" className="block text-sm font-medium text-[#d4d4ff]">
                            End Time
                        </label>
                        <select
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-[#3e3e5f] bg-[#1a1a1a] text-[#d4d4ff] rounded-md shadow-sm focus:outline-none focus:ring-[#8e44ad] focus:border-[#8e44ad] sm:text-sm"
                        >
                            {generateTimeOptions().map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                        {!isEndTimeValid() && (
                            <p className="text-red-500 text-sm mt-2">End time must be after start time.</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#d4d4ff]">
                            Purpose
                        </label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-[#3e3e5f] bg-[#1a1a1a] text-[#d4d4ff] rounded-md shadow-sm focus:outline-none focus:ring-[#8e44ad] focus:border-[#8e44ad] sm:text-sm"
                            rows="4"
                        />
                    </div>


                <button
                    type="submit"
                    className={`w-full text-white bg-[#8e44ad] hover:bg-[#6a0dad] focus:ring-4 focus:ring-[#8e44ad] font-medium rounded-lg text-sm px-5 py-2.5 mt-4 transition-transform transform-gpu duration-300 ease-in-out ${loading ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Booking...
                        </div>
                    ) : (
                        'Book'
                    )}
                </button>
                </form>

                {message && (
                    <div className="mt-6">
                        <p className={`text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    </div>
                )}
            </div>
    );
};

export default AddBooking;
