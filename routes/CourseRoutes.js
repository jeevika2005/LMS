import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

// 🌍 Public / Student
router.get("/", getAllCourses);
router.get("/:id", getCourse);

// 👨‍🏫 Admin / Instructor
router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

export default router;
