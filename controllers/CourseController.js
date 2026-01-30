import Course from "../models/CourseModel.js";

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public
 */
export const getAllCourses = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { title: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const courses = await Course.find(keyword);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single course
 * @route   GET /api/courses/:id
 * @access  Public (Student/Admin)
 */
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: "Invalid course ID" });
  }
};

/**
 * @desc    Create course
 * @route   POST /api/courses
 * @access  Admin / Instructor
 */
export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc    Update course
 * @route   PUT /api/courses/:id
 * @access  Admin / Instructor
 */
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Course not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc    Delete course
 * @route   DELETE /api/courses/:id
 * @access  Admin only
 */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
