const Course = require("../models/Course");
const User = require("../models/User");

// Create course (Teacher/Admin)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, lessons } = req.body;

    const course = await Course.create({
      title,
      description,
      lessons,
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
  // get course by id
  exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const user = req.user;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyEnrolled = user.enrolledCourses?.some(
      id => id && id.toString() === course._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrolledCourses = user.enrolledCourses.filter(Boolean); // 👈 cleanup
    user.enrolledCourses.push(course._id);

    course.students = course.students.filter(Boolean);
    course.students.push(user._id);

    await user.save();
    await course.save();

    res.json({ message: "Enrolled successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Enrollment failed" });
  }
};





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
    const userId = req.user._id;

    // const courses = await Course.find({
    //   students: userId
    // });
   const user = await User.findById(userId)
  .select("-password -__v") // 👈 User ke fields exclude
  .populate({
    path: "enrolledCourses",
    select: "-students -__v" // 👈 Course ke fields exclude
  });

    console.log(user);
    


    res.json(user.enrolledCourses);
    
    

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get courses created by logged-in teacher
exports.getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      createdBy: req.user.id,
    }).populate("students");
    

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher courses" });
  }
};

//add lesson in course
exports.addLesson = async (req, res) => {
  try {

    const { title } = req.body;

    const videoUrl = req.files?.video?.[0]?.path;
    const pdfUrl = req.files?.pdf?.[0]?.path || "";

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lessons.push({
      title,
      videoUrl,
      pdfUrl
    });

    await course.save();

    res.json({
      message: "Lesson added successfully",
      lessons: course.lessons
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding lesson" });
  }
};