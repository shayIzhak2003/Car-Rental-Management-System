import Rental from "../models/rental.js";
import Car from "../models/Car.js";
import User from "../models/User.js";


// Create rental
export const createRental = async (req, res) => {
  try {
    const { user, car, startDate, endDate } = req.body;

    // Find the selected car
    const selectedCar = await Car.findById(car);
    if (!selectedCar) {
      return res.status(404).json({ msg: "Car not found" });
    }

    // Calculate days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;

    if (isNaN(diffTime) || diffTime <= 0) {
      return res.status(400).json({ msg: "Invalid rental dates" });
    }

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate price
    const totalPrice = days * selectedCar.pricePerDay;

    // Create Rental
    const rental = await Rental.create({
      user,
      car,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({ msg: "Rental created successfully", rental });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all rentals
export const getAllRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find()
      .populate("user", "name email")
      .populate("car", "model brand dailyPrice");

    res.json(rentals);
  } catch (error) {
    next(error);
  }
};

// update rental by id
export const updateRentalById = async (req, res) => {
  try {
    const rentalId = req.params.id;
    const updateData = req.body; // update EVERYTHING sent from frontend

    const updatedRental = await Rental.findByIdAndUpdate(
      rentalId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("user", "name email")
      .populate("car", "brand model");

    if (!updatedRental) {
      return res.status(404).json({ msg: "Rental not found" });
    }

    res.json({
      msg: "Rental updated successfully",
      updatedRental,
    });
  } catch (err) {
    console.error("Update rental error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// Get rental by ID
export const getRentalById = async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate("user", "name email")
      .populate("car", "model brand dailyPrice");

    if (!rental) return res.status(404).json({ message: "Rental not found" });

    res.json(rental);
  } catch (error) {
    next(error);
  }
};

// Update rental status (completed / cancelled)
export const updateRentalStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!rental) return res.status(404).json({ message: "Rental not found" });

    res.json(rental);
  } catch (error) {
    next(error);
  }
};

// Delete rental
export const deleteRental = async (req, res, next) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    res.json({ message: "Rental deleted" });
  } catch (error) {
    next(error);
  }
};
