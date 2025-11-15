import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { addCar, getCars, updateCar, deleteCar, getCarById } from "../controllers/carController.js";

const router = express.Router();

router.get("/getAllCars", getCars);
router.get("/getCarById/:id", getCarById);
router.post("/addCar", protect, admin, addCar);
router.put("/updateCar/:id", protect, admin, updateCar);
router.delete("/deleteCar/:id", protect, admin, deleteCar);

export default router;
