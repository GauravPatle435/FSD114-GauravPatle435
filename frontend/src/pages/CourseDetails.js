
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`/api/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [id, token]);

  if (!course) {
    return <h3>Loading course...</h3>;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <h3>📚 Lessons</h3>

      {/* ✅ ADD YOUR CODE HERE */}
      {course.lessons.map((lesson) => (
        <div key={lesson._id}>
          <h4>{lesson.title}</h4>

          <iframe
            width="400"
            height="250"
            src={lesson.videoUrl}
            allowFullScreen
            title={lesson.title}
          />

          {lesson.pdfUrl && (
            <div>
              <a href={lesson.pdfUrl} target="_blank" rel="noreferrer">
                📄 View Notes
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseDetails;