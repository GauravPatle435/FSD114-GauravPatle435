import { useState } from "react";
import {jwtDecode} from "jwt-decode";

function CreateCourse() {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // 🚫 Students not allowed
  if (user.role === "student") {
    return <h3>❌ You are not allowed to create courses</h3>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Course created successfully");
      setForm({ title: "", description: "" });
    } else {
      alert(data.message || "❌ Failed to create course");
    }
  };

  return (
    <div>
      <h2>➕ Create Course</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br />

        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCourse;