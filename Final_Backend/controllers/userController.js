const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({ success: true, message: "User already exists. Please Login" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "24h" });

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("user not found");
      return res
        .status(400)
        .json({ success: false, message: "User not found. Please sign up." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("password doesnt match ...");
      return res
        .status(400)
        .json({ success: false, message: "Wrong Password" });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, name: user.name }, "secret", {
      expiresIn: "24h",
    });
    console.log("login successfull..");

    return res.json({ token, id: user._id, isAdmin: user.isAdmin, name: user.name  });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { signup, login };
