import express from "express";
import {
  createRental,
  getAllRentals,
  getRentalById,
  updateRentalStatus,
  deleteRental,
  updateRentalById,
} from "../controllers/rentalController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();

//* Create rental
router.post("/createRental", createRental, protect, admin);

//* Get all rentals
router.get("/getAllRentals", getAllRentals);

//* Get rental by ID
router.get("/getRentalById/:id", getRentalById);

//* Update rental status
router.patch("/getRentalStatus/:id/status", updateRentalStatus, protect, admin);

//* Delete rental
router.delete("/deleteRental/:id", deleteRental, protect, admin);

//* update rental by id
router.patch("/updateRental/:id", updateRentalById, protect, admin);

export default router;
