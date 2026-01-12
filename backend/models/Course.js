const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    students: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
     ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);