import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import helmet from "helmet";
// import xss from "xss-clean";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Security Middlewares
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// Body parser + cookies
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({ origin: `${process.env.CORS_ORIGIN}`, credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rentals", rentalRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
