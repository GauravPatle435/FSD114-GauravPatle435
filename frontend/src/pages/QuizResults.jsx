import React, { useEffect, useState } from "react";

function QuizResults() {

  const token = localStorage.getItem("token");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResults = async () => {

      const res = await fetch(
        "/api/quiz/results/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      setResults(data);
      setLoading(false);
    };

    fetchResults();

  }, [token]);

  if (loading) return <h3>Loading Results...</h3>;

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 pt-24 pb-12 px-4">

    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📊 My Quiz Results
      </h2>

      {/* EMPTY STATE */}
      {results.length === 0 && (
        <p className="text-center text-gray-500">
          You have not attempted any quiz yet.
        </p>
      )}

      {/* RESULTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {results.map((r, index) => {

          const percentage = Math.round(
            (r.score / r.total) * 100
          );

          return (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition"
            >

              {/* QUIZ TITLE */}
              <h4 className="font-semibold text-gray-800 mb-3">
                📝 {r.quiz.title}
              </h4>

              {/* SCORE */}
              <p className="text-gray-700 mb-1">
                Score:
                <span className="font-bold text-purple-600 ml-1">
                  {r.score} / {r.total}
                </span>
              </p>

              {/* PERCENTAGE */}
              <p className="text-gray-700 mb-2">
                Percentage:
                <span className="font-bold text-indigo-600 ml-1">
                  {percentage}%
                </span>
              </p>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>

  </div>
);
}

export default QuizResults;