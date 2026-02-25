import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AttemptQuiz() {

  const { id } = useParams(); // course id
  const token = localStorage.getItem("token");

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Quiz
  // =========================

  useEffect(() => {

    const fetchQuiz = async () => {

      const res = await fetch(
        `/api/quiz/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(""));
      setLoading(false);
    };

    fetchQuiz();

  }, [id, token]);

  // =========================
  // Select Answer
  // =========================

  const handleAnswer = (qIndex, value) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  // =========================
  // Submit Quiz
  // =========================

  const submitQuiz = async () => {

    const res = await fetch(
      `/api/quiz/submit/${quiz._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      }
    );

    const data = await res.json();

    alert(`Score: ${data.score} / ${data.total}`);
  };

  if (loading) return <h3>Loading Quiz...</h3>;

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 pt-24 pb-12 px-4">

    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

      {/* QUIZ TITLE */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🧠 {quiz.title}
      </h2>

      {/* QUESTIONS */}
      <div className="space-y-6">

        {quiz.questions.map((q, index) => (

          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >

            {/* QUESTION */}
            <h4 className="font-semibold text-gray-800 mb-4">
              {index + 1}. {q.questionText}
            </h4>

            {/* OPTIONS */}
            <div className="space-y-3">

              {q.options.map((opt, optIndex) => (

                <label
                  key={optIndex}
                  className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-50 transition"
                >

                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={opt}
                    onChange={() => handleAnswer(index, opt)}
                    className="accent-purple-500"
                  />

                  <span className="text-gray-700">
                    {opt}
                  </span>

                </label>

              ))}

            </div>

          </div>

        ))}

      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={submitQuiz}
        className="w-full mt-8  bg-gradient-to-r from-green-400 to-emerald-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition"
      >
         Submit Quiz
      </button>

    </div>

  </div>
);
}

export default AttemptQuiz;