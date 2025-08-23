// frontend/src/components/Timer.jsx
import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp }) => {
  // duration is in seconds (example: 30 mins = 1800 seconds)
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(); // trigger auto submit when time is up
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); // cleanup
  }, [timeLeft, onTimeUp]);

  // Convert seconds → mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-2 bg-gray-800 text-white rounded-md text-center font-mono">
      <h3 className="text-lg font-semibold">⏳ Time Left</h3>
      <p className="text-2xl">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
