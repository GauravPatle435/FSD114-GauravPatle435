
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function CourseDetails() {

  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  // ======================
  // Fetch Course
  // ======================

  useEffect(() => {
    fetch(`/api/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [id, token]);

  // ======================
  // Fetch Progress
  // ======================

  useEffect(() => {

    fetch(`/api/courses/progress/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCompletedLessons(data.completedLessons || []);
        setQuizCompleted(data.quizCompleted || false);
      });

  }, [id, token]);

  // ======================
  // Mark Lesson Complete
  // ======================

  const markComplete = async (courseId, lessonId) => {

    await fetch(
      `/api/courses/progress/${courseId}/${lessonId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // UI update instantly
    setCompletedLessons((prev) => [...prev, lessonId]);

    alert("Lesson Completed!");
  };


  const downloadCertificate = async () => {

  const res = await fetch(
    `/api/certificate/${course._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  if (!res.ok) {
    alert("Certificate not ready yet");
    return;
  }

  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "certificate.pdf";
  a.click();

  window.URL.revokeObjectURL(url);
};

  if (!course) {
    return <h3>Loading course...</h3>;
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 pt-24 pb-12 px-4">

    {/* COURSE CARD */}
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-gray-800">
        {course.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {course.description}
      </p>

      {/* ================= PROGRESS ================= */}

      {user.role === "student" && (
        <div className="mt-4">

          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full  bg-gradient-to-r from-green-400 to-emerald-600 transition-all"
              style={{
                width: `${
                  course.lessons.length > 0
                    ? Math.round(
                        ((completedLessons.length / course.lessons.length) *
                          75 +
                          (quizCompleted ? 25 : 0))
                      )
                    : 0
                }%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm font-semibold text-purple-700">
            Progress:{" "}
            {course.lessons.length > 0
              ? Math.round(
                  (completedLessons.length / course.lessons.length) * 75 +
                    (quizCompleted ? 25 : 0)
                )
              : 0}
            %
          </p>
        </div>
      )}

      {/* ================= CERTIFICATE ================= */}

      {course.lessons.length === completedLessons.length &&
        quizCompleted && (
          <button
            onClick={downloadCertificate}
            className="mt-6 bg-gradient-to-r from-yellow-300 to-orange-400 hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition"
          >
            🏆 Download Certificate
          </button>
        )}

      {/* ================= LESSONS ================= */}

      <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-6">
        📚 Lessons
      </h3>

      <div className="grid gap-6">

        {course.lessons.map((lesson) => (

          <div
            key={lesson._id}
            className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >

            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              {lesson.title}
            </h4>

            {/* VIDEO */}
            <div className="rounded-xl overflow-hidden shadow mb-3">
              <iframe
                className="w-full h-[250px]"
                src={lesson.videoUrl}
                allowFullScreen
                title={lesson.title}
              />
            </div>

            {/* PDF */}
            {lesson.pdfUrl && (
              <a
                href={lesson.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 font-medium hover:underline"
              >
                📄 Download Notes
              </a>
            )}

            {/* COMPLETE BUTTON */}
            {user.role === "student" && (
              <div className="mt-4">

                <button
                  onClick={() =>
                    markComplete(course._id, lesson._id)
                  }
                  disabled={completedLessons.includes(lesson._id)}
                  className={`px-5 py-2 rounded-xl font-semibold transition shadow
                  ${
                    completedLessons.includes(lesson._id)
                      ? "bg-green-300 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-400 to-indigo-500 text-white hover:opacity-90"
                  }`}
                >
                  {completedLessons.includes(lesson._id)
                    ? "✅ Completed"
                    : "Mark Complete"}
                </button>

              </div>
            )}

          </div>

        ))}

      </div>

    </div>

  </div>
);
}

export default CourseDetails;