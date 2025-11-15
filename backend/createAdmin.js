import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // הנתיב היחסי נכון

dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");

  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  const admin = await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  });

  console.log("Admin created:", admin);
  process.exit();
}

createAdmin();
