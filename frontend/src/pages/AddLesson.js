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
        `http://localhost:5000/api/courses/${id}/lessons`,
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
    <div style={{ padding: "30px" }}>

      <h2>Add New Lesson</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <label>Upload Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <br /><br />

        <label>Upload PDF (Optional)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">
          {loading ? "Uploading..." : "Add Lesson"}
        </button>

      </form>

    </div>
  );
};

export default AddLesson;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// function AddLesson() {

//   const { id } = useParams(); // course id
//   const token = localStorage.getItem("token");

//   const [title, setTitle] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // Upload File Function
//   // =========================
//   const uploadFile = async (file) => {

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("http://localhost:5000/api/courses/upload", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       body: formData
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error("Upload failed");
//     }

//     return data.url;
//   };

//   // =========================
//   // Submit Lesson
//   // =========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       alert("Video required");
//       return;
//     }

//     try {

//       setLoading(true);

//       // Upload files
//       const videoUrl = await uploadFile(videoFile);
//       let pdfUrl = "";

//       if (pdfFile) {
//         pdfUrl = await uploadFile(pdfFile);
//       }

//       // Save lesson
//       const res = await fetch(
//         `http://localhost:5000/api/courses/${id}/lessons`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             title,
//             videoUrl,
//             pdfUrl
//           })
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Lesson added successfully");

//         setTitle("");
//         setVideoFile(null);
//         setPdfFile(null);

//       } else {
//         alert(data.message || "Failed to add lesson");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("❌ Upload failed");

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Add Lesson</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           placeholder="Lesson Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <br /><br />

//         <label>Upload Video</label>
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files[0])}
//           required
//         />

//         <br /><br />

//         <label>Upload PDF (Optional)</label>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setPdfFile(e.target.files[0])}
//         />

//         <br /><br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Add Lesson"}
//         </button>

//       </form>

//     </div>
//   );
// }

// export default AddLesson;