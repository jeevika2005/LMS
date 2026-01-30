import mongoose from "mongoose";
import dotenv from "dotenv";
import courses from "./data/courses.json" assert { type: "json" };
import Course from "./models/CourseModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  await Course.deleteMany();
  await Course.insertMany(courses);
  console.log("Courses seeded");
  process.exit();
};

seedData();
