import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [score, setScore] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/exam/score", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScore(res.data.score);
        setName(res.data.name);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch score");
      }
    };
    fetchScore();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // or "/"
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 text-white rounded-xl shadow-lg mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Exam Result</h2>

      {error && <p className="text-red-500">{error}</p>}

      {score !== null && !error && (
        <>
          <p className="text-lg mb-2">Hello, <span className="font-semibold">{name}</span>!</p>
          <p className="text-xl font-bold mb-4">
            Your Score: <span className="text-green-400">{score}</span> / 5
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Result;
