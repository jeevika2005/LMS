import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { 
  markAttendance, 
  getMyAttendance, 
  getAllAttendance 
} from "../controllers/AttendanceController.js";

const router = express.Router();

// 1. Students mark their own attendance
router.post("/mark", protect, authorize("student"), markAttendance);

// 2. Students view their own history
router.get("/my", protect, authorize("student"), getMyAttendance);

// 3. Admins/Instructors view EVERYONE'S history
router.get("/all", protect, authorize("admin", "instructor"), getAllAttendance);

export default router;