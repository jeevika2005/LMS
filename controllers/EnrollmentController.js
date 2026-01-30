import Enrollment from "../models/EnrollmentModel.js";
import Course from "../models/CourseModel.js";

/**
 * @desc    Student enrolls in a course
 * @route   POST /api/enrollments
 * @access  Private (Student)
 */
export const enrollCourse = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    // ✅ 1. Extract courseId safely
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // ✅ 2. Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ 3. Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // ✅ 4. Create enrollment
    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Course enrolled successfully",
      enrollment,
    });

  } catch (error) {
    console.error("ENROLL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get logged-in student's enrolled courses
 * @route   GET /api/enrollments
 * @access  Private (Student)
 */
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate("course"); // 🔥 important for MyLearning page

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });

  } catch (error) {
    console.error("GET ENROLLMENTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
