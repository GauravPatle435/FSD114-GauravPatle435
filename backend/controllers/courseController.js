const Course = require("../models/Course");

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