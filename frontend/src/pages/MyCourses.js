import { useEffect, useState } from "react";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/courses/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [token]);

  return (
    <div>
      <h2>🎓 My Courses</h2>

      {courses.length === 0 && <p>No courses enrolled yet</p>}

      {courses.map((course) => (
        <div key={course._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;