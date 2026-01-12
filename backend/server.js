const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// const { protect } = require("./middleware/authMiddleware");

// app.get("/api/protected", protect, (req, res) => {
//   res.json({
//     message: "Protected route accessed",
//     user: req.user,
//   });
// });

// protected routes
const protectedRoutes = require("./routes/protectedRoutes");

app.use("/api", protectedRoutes);

// course routes
const courseRoutes = require("./routes/courseRoutes");

app.use("/api/courses", courseRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("EduVillage Backend Running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});