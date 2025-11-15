import Rental from "../models/rental.js";
import Car from "../models/Car.js";
import User from "../models/User.js";

// Create a new rental
export const createRental = async (req, res, next) => {
  try {
    const { user, car, startDate, endDate } = req.body;

    const carExists = await Car.findById(car);
    if (!carExists) return res.status(404).json({ message: "Car not found" });

    const userExists = await User.findById(user);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    // Calculate total price automatically
    const days =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);

    const totalPrice = days * carExists.dailyPrice;

    const rental = await Rental.create({
      user,
      car,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json(rental);
  } catch (error) {
    next(error);
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
