// import { useState } from "react";
// import {jwtDecode} from "jwt-decode";

// function CreateCourse() {
//   const token = localStorage.getItem("token");
//   const user = jwtDecode(token);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     videoUrl : "",
//     pdfUrl : "",
//   });

//   // 🚫 Students not allowed
//   if (user.role === "student") {
//     return <h3>❌ You are not allowed to create courses</h3>;
//   }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const courseData ={
//       title :form.title,
//       description : form.description,
//       lessons:[
//         {
//           title: "Introduction",
//           videoUrl : form.videoUrl,
//           pdfUrl : form.pdfUrl,
//         }
//       ]
//     }

//     const res = await fetch("/api/courses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(courseData),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("✅ Course created successfully");
//       setForm({ title: "", description: "", videoUrl:"", pdfUrl:"" });
//     } else {
//       alert(data.message || "❌ Failed to create course");
//     }
//   };

//   return (
//     <div>
//       <h2>➕ Create Course</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Course Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <textarea
//           name="description"
//           placeholder="Course Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="videoUrl"
//           placeholder=" Lesson Video Url"
//           value={form.videoUrl}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="pdfUrl"
//           placeholder=" Lesson Notes Url"
//           value={form.pdfUrl}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <button type="submit">Create Course</button>
//       </form>
//     </div>
//   );
// }

// export default CreateCourse;


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

  // 🚫 Students blocked
  if (user.role === "student") {
    return <h3>❌ Students cannot create courses</h3>;
  }

  // Upload function
  const uploadFile = async (file) => {

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/courses/upload", {
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

    // Upload files
    const videoUrl = await uploadFile(video);
    const pdfUrl = await uploadFile(pdf);

    const lesson = {
      title: lessonTitle,
      videoUrl,
      pdfUrl,
    };

    const res = await fetch("http://localhost:5000/api/courses", {
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
  };

  return (
    <div>

      <h2>Create Course</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br /><br />

        <input
          placeholder="Lesson Title"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          required
        />

        <br /><br />

        <label>Upload Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />

        <br /><br />

        <label>Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
        />

        <br /><br />

        <button type="submit">
          Create Course
        </button>

      </form>

    </div>
  );
}

export default CreateCourse;