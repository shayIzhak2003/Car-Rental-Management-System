import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "Email already exists" });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
  res.status(201).json({ msg: "Registered successfully", user });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(400).json({ msg: "Invalid email or password" });

  const token = generateToken(user._id);
  res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
  res.json({ msg: "Logged in successfully", user });
};

// Logout
export const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ msg: "Logged out successfully" });
};
