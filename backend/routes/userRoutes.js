import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
     getUsers,
     getUser,
     getUserCount,
     getRegularUserCount,
     updateUserTheme, 
     getAdminCount,
    } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllUsers", protect, admin, getUsers);
router.get("/getUserById/:id", protect, getUser);
router.get("/getUserCount", protect, admin, getUserCount);
router.get("/getRegularUserCount", protect, admin, getRegularUserCount);
router.put("/updateTheme", protect, updateUserTheme);
router.get("/getAdminCount", protect, admin, getAdminCount);

export default router;
