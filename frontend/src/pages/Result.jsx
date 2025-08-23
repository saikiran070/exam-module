import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get score + total from Exam.jsx navigate()
  const { score, total } = location.state || { score: 0, total: 0 };

  const percentage = ((score / total) * 100).toFixed(2);

  // ✅ Function for remarks
  const getRemarks = () => {
    if (percentage >= 80) return "🎉 Excellent work!";
    if (percentage >= 50) return "👍 Good job, keep practicing!";
    return "📘 Don’t worry, keep learning!";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Exam Result</h2>

        {/* Score */}
        <div className="text-6xl font-extrabold text-green-600 mb-2">
          {score}/{total}
        </div>
        <p className="text-lg text-gray-600 mb-6">({percentage}%)</p>

        {/* Remarks */}
        <p className="text-xl font-medium mb-6">{getRemarks()}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/exam")}
          >
            Retake Exam
          </button>
          <button
            className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
