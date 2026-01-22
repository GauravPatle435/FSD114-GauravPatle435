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
// exports.getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     const user = req.user;

//     // Admin always allowed
//     if (user.role === "admin") {
//       return res.json(course);
//     }

//     // Teacher who created course allowed
//     if (
//       user.role === "teacher" &&
//       course.createdBy.toString() === user.id
//     ) {
//       return res.json(course);
//     }

//     // Student must be enrolled
//     if (user.role === "student") {
//       const enrolled = user.enrolledCourses.includes(course._id);

//       if (!enrolled) {
//         return res
//           .status(403)
//           .json({ message: "You are not enrolled in this course" });
//       }

//       return res.json(course);
//     }

//     res.status(403).json({ message: "Access denied" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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



// exports.enrollCourse = async (req, res) => {
//   try {
//     console.log("cource controler started")
//     const user =  req.user;
//     const course =  await Course.findById(req.params.id);
    
//     console.log(user ,"hhhhhhhs");
//      console.log("USER ID =", req.user._id);
//     console.log("COURSE ID =", req.params.id);
    

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Prevent duplicate enrollment
//     if (user.enrolledCourses.includes(course._id)) {
//       return res.status(400).json({ message: "Already enrolled" });
//     }
//     console.log("includes");
    
//     // Add course to user
//     user.enrolledCourses.push(course._id);
  
    
//     await user.save();
//     // Add student to course
//     course.enrolledStudents.push(user._id);

    
//     await course.save();

// //     await Course.findByIdAndUpdate(courseId, {
// //   $addToSet: { enrolledStudents: userId }
// // });

// // await User.findByIdAndUpdate(userId, {
// //   $addToSet: { enrolledCourses: courseId }
// // });

//     res.json({ message: "Enrolled successfully" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Enrollment failed" });
//   }
// };
// // exports.enrollCourse = async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);

// //     if (!course) {
// //       return res.status(404).json({ message: "Course not found" });
// //     }

// //     // Prevent duplicate enrollment
// //     if (course.students.includes(req.user.id)) {
// //       return res.status(400).json({ message: "Already enrolled" });
// //     }

// //     course.students.push(req.user.id);
// //     await course.save();

// //     res.json({ message: "Enrolled successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Enrollment failed" });
// //   }
// // };

// // Unenroll from course (Student only)
// // exports.unenrollCourse = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id);

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     const isEnrolled = user.enrolledCourses.some(
// //       (courseId) => courseId.toString() === req.params.id
// //     );

// //     if (!isEnrolled) {
// //       return res.status(400).json({ message: "Not enrolled in this course" });
// //     }

// //     user.enrolledCourses = user.enrolledCourses.filter(
// //       (courseId) => courseId.toString() !== req.params.id
// //     );

// //     await user.save();

// //     res.json({ message: "Unenrolled successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

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
// exports.getMyCourses = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate("enrolledCourses");

//     res.json(user.enrolledCourses);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// exports.getMyCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({
//       students: req.user.id,
//     }).populate("createdBy", "name email");

//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch enrolled courses" });
//   }
// };

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