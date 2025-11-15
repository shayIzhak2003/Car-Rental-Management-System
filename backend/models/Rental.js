import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number },
    status: { type: String, enum: ["ongoing", "completed", "cancelled"], default: "ongoing" },
  },
  { timestamps: true }
);

export default mongoose.model("Rental", rentalSchema);
