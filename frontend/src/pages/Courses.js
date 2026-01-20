import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
 import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
   const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    
    fetch("/api/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [token]);

  const enrollCourse = async (id) => {
  try {
    const res = await fetch(`/api/courses/${id}/enroll`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    alert(data.message);
  } catch (error) {
    alert("Enrollment failed");
  }
};

  return (
    <div>
      <h2>📚 Courses</h2>

      {courses.map((course) => (
        <div key={course._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <small>
            Created by: {course.createdBy?.name} ({course.createdBy?.role})
          </small>
        <br></br>
          {user.role === "student" && (
         <button onClick={() => enrollCourse(course._id)}>
          ➕ Enroll
         </button>
         
           
        )}
        {(user.role === "admin"  ||  user.role === "teacher" )&& (<button onClick={() => navigate(`/courses/${course._id}`)}>
          ▶ View Course
         </button>)}
        </div>
      ))}
    </div>
  );
}

export default Courses;