import Car from "../models/Car.js";

// Add car (admin)
export const addCar = async (req, res) => {
  const car = await Car.create(req.body);
  res.status(201).json(car);
};

// Get all cars
export const getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

// Update car (admin)
export const updateCar = async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(car);
};

// Delete car (admin)
export const deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ msg: "Car deleted" });
};

// Get car by ID
export const getCarById = async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.json(car);
};