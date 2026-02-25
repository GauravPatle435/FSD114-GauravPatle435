import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CreateQuiz() {

  const { id } = useParams(); // course id
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: ""
    }
  ]);

  const [loading, setLoading] = useState(false);

  // =========================
  // Handle Question Change
  // =========================

  const handleQuestionChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswer = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  // =========================
  // Add New Question
  // =========================

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: ""
      }
    ]);
  };

  // =========================
  // Submit Quiz
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Quiz title required");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `/api/quiz/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            questions
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Quiz Created Successfully");

        setTitle("");
        setQuestions([
          {
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: ""
          }
        ]);

      } else {
        alert(data.message || "Quiz creation failed");
      }

    } catch (error) {
      console.error(error);
      alert("❌ Server error");

    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex justify-center items-start pt-24 pb-12 px-4">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📝 Create Quiz
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* QUIZ TITLE */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Quiz Title
          </label>

          <input
            placeholder="Enter quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* QUESTIONS */}
        {questions.map((q, qIndex) => (

          <div
            key={qIndex}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm"
          >

            <h4 className="font-semibold text-purple-700 mb-3">
              Question {qIndex + 1}
            </h4>

            {/* QUESTION TEXT */}
            <input
              placeholder="Enter question text"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, e.target.value)
              }
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-purple-400 outline-none"
            />

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {q.options.map((opt, optIndex) => (

                <input
                  key={optIndex}
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, optIndex, e.target.value)
                  }
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                />

              ))}

            </div>

            {/* CORRECT ANSWER */}
            <input
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) =>
                handleCorrectAnswer(qIndex, e.target.value)
              }
              required
              className="w-full border border-green-400 rounded-lg px-3 py-2 mt-4 focus:ring-2 focus:ring-green-400 outline-none"
            />

          </div>
        ))}

        {/* ADD QUESTION BUTTON */}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-gradient-to-r from-pink-300 to-purple-400 hover:opacity-90 text-white px-5 py-2 rounded-xl font-semibold shadow transition"
        >
          ➕ Add Question
        </button>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create Quiz"}
        </button>

      </form>

    </div>

  </div>
);
}

export default CreateQuiz;