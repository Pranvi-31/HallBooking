import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Home.css'; 

const Booking = () => {
  const { authToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } else {
      fetchBookings();
    }
  }, [authToken, navigate]);

  const fetchBookings = async () => {
    const res = await axios.get(`http://localhost:3000/api/bookings/mybookings`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    setBookings(res.data.bookings);
  };

  const handleBookNow = () => {
    if (authToken) {
      navigate('/addbooking');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 md:mb-0">
          <span className="text-[#8e44ad]">My Bookings</span>
        </h1>
        <button
          onClick={handleBookNow}
          className="text-white bg-[#8e44ad] hover:bg-[#6a0dad] focus:ring-4 focus:ring-[#8e44ad] font-medium rounded-lg text-sm px-4 py-2.5 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          ➕ Book Now
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-bold text-sm md:text-lg mb-4 text-[#d4d4ff]">
        <div>Hall</div>
        <div>Date</div>
        <div className="hidden md:block">Slot</div>
        <div className="hidden md:block">Status</div>
      </div>

      <ul className="space-y-4 bg-[#1a1a1a]">
        {bookings.length === 0 ? (
          <li className="text-center col-span-2 md:col-span-4 text-gray-500">No bookings found.</li>
        ) : (
          bookings.map((booking) => (
            <li
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center border border-[#3e3e5f] p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-[#2e2e2e]"
            >
              <div className="font-medium text-[#d4d4ff]">{booking.hall}</div>
              <div className="text-[#b0b0e0]">{moment(booking.date).format('YYYY-MM-DD')}</div>
              <div className="text-[#b0b0e0] md:block">{booking.slot}</div>
              <div
                className={`text-sm font-semibold ${booking.status === "Approved"
                    ? "text-green-500"
                    : booking.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
              >
                {booking.status}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Booking;
