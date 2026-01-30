import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String },
    price: { type: Number },
    category: { type: String },
    images: [
      {
        image: String
      }
    ],
    ratings: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 100
    }
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
