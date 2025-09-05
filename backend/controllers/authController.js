const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// Register User
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Register request received for email:", email);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });
    console.log("User registered:", newUser.email);

    const token = generateToken(newUser._id);
    console.log("Generated Token (Testing Only):", token);  
    res.status(201).json({
      success: true,
      user: { _id: newUser._id, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    console.log("Generated Token (Testing Only):", token); // ✅ log token for testing

    res.status(200).json({
      success: true,
      user: { _id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};