import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    if (!token) return;
    fetch("/api/courses/teacher", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>        
      {
        setCourses(data)
        //console.log(data);
      }

     );

  }, [token]);

 return (
    <div>
      <h2>📚 My Courses</h2>

      {courses.map((course) => (
        <div key={course._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          {/* ✅ ADD EDIT BUTTON HERE */}
          <button onClick={() => navigate(`/teacher/courses/edit/${course._id}`)}>
            ✏️ Edit
          </button>

          {(user.role === "teacher" )&& (<button onClick={() => navigate(`/teacher/courses/add-lesson/${course._id}`)}>
          ▶ Add Lesson
         </button>)}
        </div>
      ))}
    </div>
  );
}

export default TeacherCourses;