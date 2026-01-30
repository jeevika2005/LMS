import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentName: String,
  subject: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent", "Late"], default: "Present" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Attendance", attendanceSchema);