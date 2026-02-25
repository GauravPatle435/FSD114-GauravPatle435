
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function CreateCourse() {

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  // Course fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Lesson fields
  const [lessonTitle, setLessonTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);

  const [loading, setLoading] = useState(false);

  // 🚫 Students blocked
  if (user.role === "student") {
    return <h3>❌ Students cannot create courses</h3>;
  }

  // Upload function
  const uploadFile = async (file) => {

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/courses/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  // Create Course
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !pdf) {
      alert("Please upload video and pdf");
      return;
    }
    try{
      setLoading(true);
    // Upload files
    const videoUrl = await uploadFile(video);
    const pdfUrl = await uploadFile(pdf);

    const lesson = {
      title: lessonTitle,
      videoUrl,
      pdfUrl,
    };

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        lessons: [lesson],
      }),
    });

    if (res.ok) {
      alert("✅ Course Created Successfully");
      setTitle("");
      setDescription("");
      setLessonTitle("");
    } else {
      alert("❌ Course creation failed");
    }
  }catch(error){
    alert("server error");
  }finally{
    setLoading(false);
  }
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex justify-center items-start pt-24 pb-12 px-4">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📚 Create New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* COURSE TITLE */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Title
          </label>

          <input
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Description
          </label>

          <textarea
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* LESSON TITLE */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            First Lesson Title
          </label>

          <input
            placeholder="Enter lesson title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* VIDEO UPLOAD */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Lesson Video
          </label>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
            className="w-full border border-dashed border-purple-400 rounded-xl p-3 bg-purple-50 cursor-pointer"
          />
        </div>

        {/* PDF UPLOAD */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Lesson PDF
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            required
            className="w-full border border-dashed border-indigo-400 rounded-xl p-3 bg-indigo-50 cursor-pointer"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

      </form>

    </div>

  </div>
);
}

export default CreateCourse;