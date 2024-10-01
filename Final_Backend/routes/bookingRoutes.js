const express = require("express");

const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const mongoose = require("mongoose");
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error while featching bookings", error });
  }
});

router.get("/mybookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({user: req.User._id}).populate("user", "name email");
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error while featching bookings", error });
  }
});

router.post("/", protect, async (req, res) => {
  const { hall, date, slot, status, notes } = req.body;

  try {
    const newBooking = new Booking({ hall, date, slot, status, user: req.User.id, notes: notes});
    const booking = await newBooking.save();
    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
});

router.put("/:id", protect, admin, async (req, res) => {
  const { id, status } = req.body;
  try {
    await Booking.findOneAndUpdate(
        {_id: req.params.id},
      {status:  status}
    ).exec();
    return res.status(200).json( "Status Updated Successfully");
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error updating bookings", error });
  }
});

module.exports = router;
