const Booking = require("../models/Booking");


const createBooking = async (req, res) => {
  const { hall, date, slot } = req.body;
  const userId = req.user.id;

  try {
    const booking = await Booking.create({ hall, date, slot, user: userId });
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

module.exports = { createBooking, getBookings, updateBookingStatus };
