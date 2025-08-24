// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Exam from "./pages/Exam";
import Result from "./pages/Result";

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/exam" element={user ? <Exam /> : <Navigate to="/login" />} />
      <Route path="/result" element={user ? <Result /> : <Navigate to="/login" />} />
      {/* catch-all route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
