import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Exam from "./pages/Exam";
import Result from "./pages/Result";

// Simple ProtectedRoute
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      {/* Auth (Login/Register) */}
      <Route path="/" element={<Auth />} />

      {/* Exam Page - Protected */}
      <Route
        path="/exam"
        element={
          <ProtectedRoute>
            <Exam />
          </ProtectedRoute>
        }
      />

      {/* Result Page - Protected */}
      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

