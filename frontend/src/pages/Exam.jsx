import React, { useEffect, useState } from "react";
import Timer from "../components/Timer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token"); // stored after login
        const res = await axios.get("http://localhost:5001/api/exam/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // ✅ Handle option selection
  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  // ✅ Submit Exam
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5001/api/exam/submit",
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/result", { state: { score: res.data.score, total: res.data.total } });
    } catch (err) {
      console.error("Error submitting exam:", err);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading questions...</p>;

  if (questions.length === 0)
    return <p className="text-center text-lg">No questions available.</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Timer */}
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📘 Exam</h2>
        <Timer duration={30 * 60} onTimeUp={handleSubmit} />
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Q{currentIndex + 1}. {currentQuestion.question}
        </h3>

        <ul className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <li key={idx}>
              <label
                className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${
                  answers[currentQuestion._id] === option
                    ? "bg-blue-500 text-white border-blue-600"
                    : "hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion._id}
                  value={option}
                  checked={answers[currentQuestion._id] === option}
                  onChange={() => handleAnswer(currentQuestion._id, option)}
                  className="hidden"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            ⬅ Prev
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit Exam
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              Next ➡
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exam;
