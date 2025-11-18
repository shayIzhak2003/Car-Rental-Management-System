import mongoose from "mongoose";
import dotenv from "dotenv";
import readline from "readline";
import User from "./models/User.js";

dotenv.config();

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask a question and return a Promise
const ask = (q) =>
  new Promise((resolve) => {
    rl.question(q, (answer) => resolve(answer.trim()));
  });

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected\n");

  try {
    const name = await ask("Enter admin name: ");
    const email = await ask("Enter admin email: ");
    const password = await ask("Enter admin password: ");

    // Check if admin exists
    const adminExists = await User.findOne({ email });
    if (adminExists) {
      console.log("\n Admin already exists");
      rl.close();
      process.exit();
    }

    // Create admin
    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    console.log("\n Admin created successfully:");
    console.log(admin);
  } catch (err) {
    console.error("Error:", err);
  }

  rl.close();
  process.exit();
}

createAdmin();
