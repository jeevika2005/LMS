import Attendance from "../models/AttendanceModel.js";

export const markAttendance = async (req, res) => {
  try {
    const { subject, status } = req.body;

    const newRecord = new Attendance({
      student: req.user.id, // Linked to the logged-in user
      studentName: req.user.name,
      subject,
      status,
      date: new Date()
    });

    await newRecord.save();
    res.status(201).json({ success: true, message: "Attendance saved!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};