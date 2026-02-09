const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
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


// protected routes
const protectedRoutes = require("./routes/protectedRoutes");

app.use("/api", protectedRoutes);

// course routes
const courseRoutes = require("./routes/courseRoutes");

app.use("/api/courses", courseRoutes);

// admin routes
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

//quiz routes
const quizRoutes = require("./routes/quizRoutes");
app.use("/api/quiz",quizRoutes);

// certificate route
const certificateRoutes = require("./routes/certificateRoutes");

app.use("/api/certificate", certificateRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("EduVillage Backend Running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/build/index.html")
    );
  });
}