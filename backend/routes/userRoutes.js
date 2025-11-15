import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getUsers, getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllUsers", protect, admin, getUsers);
router.get("/getUserById/:id", protect, getUser);

export default router;
