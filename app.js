import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 1. Import cors
import authRoutes from "./routes/AuthRoutes.js"; 
import courseRoutes from "./routes/CourseRoutes.js";
import connectDB from "./config/connectDatabase.js"; 
import enrollmentRoutes from "./routes/EnrollmentRoutes.js";

// Load Environment Variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// 2. Enable CORS (Must be before routes)
app.use(cors({
    origin: "http://localhost:3000", // Your React URL
    credentials: true
}));

app.use(express.json()); 

// Connect to Database
connectDB();

// Mounting Routes
app.use("/api/auth", authRoutes); 
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));