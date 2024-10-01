const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { protect } = require("./middleware/authMiddleware");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0/hallBookings", {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error while connecting :", err);
  });

const createAdmin = async () => {
  let checkAdmin = await User.findOne({ email: "pranvi455@gmail.com", isAdmin: true}).lean();
  if(checkAdmin) {
    console.log("Admin user already exists");
    return;
  }
  const admin = new User({
    email: "pranvi455@gmail.com",
    password: "123456", // plain password, will be hashed by the pre-save hook
    isAdmin: true,
  });

  await admin.save();
  console.log("Admin user created");
};


createAdmin();
// Import routes
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

//Import routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", protect, bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
