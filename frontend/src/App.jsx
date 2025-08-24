// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import Logout from "./pages/Logout";

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {/* Single Auth page for both Register & Login */}
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/exam" />} />

      {/* Protected Routes */}
      <Route path="/exam" element={user ? <Exam /> : <Navigate to="/auth" />} />
      <Route path="/result" element={user ? <Result /> : <Navigate to="/auth" />} />
      <Route path="/logout" element={user ? <Logout /> : <Navigate to="/auth" />} />

      {/* Default route → redirect root to /auth */}
      <Route path="/" element={<Navigate to="/auth" />} />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default App;
