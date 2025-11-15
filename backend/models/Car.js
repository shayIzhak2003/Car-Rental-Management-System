import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    model: String,
    brand: String,
    year: Number,
    pricePerDay: Number,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
