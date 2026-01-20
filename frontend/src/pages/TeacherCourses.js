import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("/api/courses/teacher", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setCourses(data.courses) );
  }, [token]);

  return (
    <div>
      <h2>📚 My Courses</h2>

      {Array.isArray(courses) && courses.map((course) => (
        <div key={course._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          {/* ✅ ADD EDIT BUTTON HERE */}
          <button onClick={() => navigate(`/teacher/courses/edit/${course._id}`)}>
            ✏️ Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default TeacherCourses;