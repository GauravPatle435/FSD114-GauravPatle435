const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const { createCourse, getCourseById, getCourses, enrollCourse, updateCourse, getMyCourses, getTeacherCourses, addLesson } = require("../controllers/courseController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Teacher/Admin → Create course
router.post(
  "/",
  protect,
  authorizeRoles("teacher", "admin"),
  createCourse
);



// Student/Admin/Teacher → View courses
router.get("/", protect, getCourses);

// student-> enroll in course
router.post(
  "/:id/enroll",
  protect,
  authorizeRoles("student"),
  enrollCourse
);



// teacher + admin-- update course
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  updateCourse
);

// Student → My Courses
router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getMyCourses
);

// Teacher → My Created Courses
router.get(
  "/teacher",
  protect,
  authorizeRoles("teacher", "admin"),
  getTeacherCourses
);
// upload course
router.post(
  "/upload",
  protect,
  authorizeRoles("admin", "teacher"),
  upload.single("file"),
  (req, res) => {
     if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

    res.json({
      url: req.file.path,
    });
  }
);

//add lesson
router.post(
  "/:id/lessons",
  protect,
  authorizeRoles("teacher", "admin"),
  upload.fields([
    {name:"video",maxcount:1},
    {name:"pdf",maxcount:1}
  ]),
  addLesson
);

router.get("/:id", protect, getCourseById);
module.exports = router;



