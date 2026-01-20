const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title :{
    type:String,
    required: true,
  },
  videoUrl: {
    type:String,
  },
  pdfUrl: {
    type:String,
  },
  duration : {
    type:String,
  },
});

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

    lessons :[lessonSchema],

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