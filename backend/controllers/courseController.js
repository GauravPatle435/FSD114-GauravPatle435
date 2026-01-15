const Course = require("../models/Course");
const User = require("../models/User");

// Create course (Teacher/Admin)
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses (Student)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name role");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Enroll in course (Student only)
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Prevent duplicate enrollment
    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.students.push(req.user.id);
    await course.save();

    res.json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
};

// Unenroll from course (Student only)
// exports.unenrollCourse = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isEnrolled = user.enrolledCourses.some(
//       (courseId) => courseId.toString() === req.params.id
//     );

//     if (!isEnrolled) {
//       return res.status(400).json({ message: "Not enrolled in this course" });
//     }

//     user.enrolledCourses = user.enrolledCourses.filter(
//       (courseId) => courseId.toString() !== req.params.id
//     );

//     await user.save();

//     res.json({ message: "Unenrolled successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// update course//////////////////////////////////
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Admin can edit any course
    if (
      req.user.role !== "admin" &&
      course.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;

    await course.save();

    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get courses enrolled by logged-in student
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      students: req.user.id,
    }).populate("createdBy", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
};

// Get courses created by logged-in teacher
exports.getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      createdBy: req.user.id,
    }).populate("students", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher courses" });
  }
};