import express from "express";
import { enrollCourse, getMyEnrollments } from "../controllers/EnrollmentController.js";
import { protect, studentOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student enrolls in course
router.post("/", protect, studentOnly, enrollCourse);

// Student gets their enrollments
router.get("/my", protect, studentOnly, getMyEnrollments);

export default router;
