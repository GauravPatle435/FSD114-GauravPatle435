import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

function DeleteCourse() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    fetch("/api/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [token]);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    const res = await fetch(`/api/admin/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("✅ Course deleted");
      setCourses(courses.filter((c) => c._id !== id));
    } else {
      alert("❌ Failed to delete");
    }
  };

  return (
    <div>
      <h2>🗑️ Delete Courses (Admin)</h2>

      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {user.role ==="admin" &&(
            <button onClick={() => deleteCourse(course._id)}>
            ❌ Delete
          </button>
        )}
          
        </div>
      ))}
    </div>
  );
}

export default DeleteCourse;