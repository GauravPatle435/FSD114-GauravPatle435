import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddLesson = () => {

  const { id } = useParams(); // course id

  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !video) {
      alert("Title and Video required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);
    formData.append("pdf", pdf);

    try {
      setLoading(true);

       await axios.post(
        `/api/courses/${id}/lessons`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Lesson Added Successfully ✅");

      setTitle("");
      setVideo(null);
      setPdf(null);

      setLoading(false);

    } catch (err) {
      console.log(err);
      alert("Upload Failed ❌");
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center px-4">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ➕ Add New Lesson
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TITLE INPUT */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Lesson Title
          </label>

          <input
            type="text"
            placeholder="Enter lesson title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* VIDEO UPLOAD */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Video
          </label>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full border border-dashed border-purple-400 rounded-xl p-3 bg-purple-50 cursor-pointer"
          />
        </div>

        {/* PDF UPLOAD */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload PDF (Optional)
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            className="w-full border border-dashed border-indigo-400 rounded-xl p-3 bg-indigo-50 cursor-pointer"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Add Lesson"}
        </button>

      </form>

    </div>

  </div>
);
};

export default AddLesson;

