import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

const Exam = ({ onExamSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/exam/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load questions");
      }
    };
    fetchQuestions();
  }, []);

  // Track selected answers
  const handleChange = (id, optionIndex) => {
    setAnswers({ ...answers, [id]: optionIndex });
  };

  // Submit exam answers
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5001/api/exam/submit",
        { answers }, // { questionId: selectedIndex }
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onExamSubmit(res.data); // save score or result in parent
      setSubmitted(true);
      navigate("/result"); // redirect to result page
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  // Show message if already submitted
  if (submitted) {
    return (
      <div className="p-6 max-w-lg mx-auto text-white">
        <h2 className="text-2xl font-bold mb-4">Exam Submitted</h2>
        <p>You have already completed the exam.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 text-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Exam</h2>
      <Timer duration={300} onTimeUp={handleSubmit} /> {/* 5-minute timer */}
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((q) => (
            <div key={q._id} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              {q.options.map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={q._id}
                    value={i}
                    onChange={() => handleChange(q._id, i)}
                    className="mr-2"
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
          >
            Submit Exam
          </button>
        </form>
      )}
    </div>
  );
};

export default Exam;
