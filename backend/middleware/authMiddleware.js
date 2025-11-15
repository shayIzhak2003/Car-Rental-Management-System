import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ msg: "Admin access only" });
};
