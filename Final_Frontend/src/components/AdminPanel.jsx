import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';

const AdminPanel = () => {
    const { authToken, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        } else {
            fetchBookings();
        }
    }, [authToken]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/bookings", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setBookings(res.data.bookings);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
            alert("Failed to fetch bookings. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        setIsUpdating(true);
        try {
            await axios.put(`http://localhost:3000/api/bookings/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            await fetchBookings();
        } catch (error) {
            console.error("Failed to update booking status:", error);
            alert("Failed to update booking status. Please try again later.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a]">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <p className="text-gray-300">Loading bookings...</p>
                </div>
            </div>
        );
    }

    return (
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-6">
                        <span className="text-[#8e44ad]">Admin Control Panel</span>
                    </h1>
                <button
                    onClick={() => {
                        logout();
                        localStorage.clear();
                    }}
                    className="flex items-center text-white bg-[#8e44ad] hover:bg-[#6a0dad] font-medium rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8e44ad] focus:ring-offset-2 transition-all duration-300"
                    disabled={isUpdating}
                >
                    <FiLogOut className="mr-2" />
                    Logout
                </button>
                </div>
                <p className="mb-8 text-lg font-medium text-gray-400">
                    Review, approve, or reject hall booking requests with a single click.
                </p>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-[#2e2e2e] rounded-lg">
                        <thead>
                            <tr className="bg-[#333333] text-gray-300 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Hall</th>
                                <th className="py-3 px-6 text-left">Date</th>
                                <th className="py-3 px-6 text-left">Slot</th>
                                <th className="py-3 px-6 text-left">Purpose</th>
                                <th className="py-3 px-6 text-left" style={{ width: '150px' }}>Status</th>
                                <th className="py-3 px-6 text-right" style={{ width: '200px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400 text-sm font-light">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-sm text-gray-500">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="border-b border-[#3e3e5f] hover:bg-[#3e3e3e] transition">
                                        <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                                            {booking.user.name}
                                        </td>
                                        <td className="py-3 px-6 text-left">{booking.hall}</td>
                                        <td className="py-3 px-6 text-left">{moment(booking.date).format('YYYY-MM-DD')}</td>
                                        <td className="py-3 px-6 text-left">{booking.slot}</td>
                                        <td className="py-3 px-6 text-left">{booking.notes}</td>
                                        <td className="py-3 px-6 text-left">
                                            <span className={`py-1 px-3 rounded-full text-xs font-semibold ${booking.status === "Approved" ? "bg-green-600 text-white" : booking.status === "Rejected" ? "bg-red-600 text-white" : "bg-yellow-600 text-white"}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-right flex justify-end space-x-2">
                                            {(booking.status === "Pending" || booking.status === "Rejected") && (
                                                <button
                                                    onClick={() => handleStatusChange(booking._id, "Approved")}
                                                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 transition duration-200"
                                                    disabled={isUpdating}
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {booking.status !== "Rejected" && (
                                                <button
                                                    onClick={() => handleStatusChange(booking._id, "Rejected")}
                                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 transition duration-200"
                                                    disabled={isUpdating}
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default AdminPanel;
