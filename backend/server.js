// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ---------- Middleware ----------
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));
app.use(express.json());

// ---------- Route Imports ----------
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');

// ---------- Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);

// Test route
app.get("/", (req, res) => res.send("API is working 🚀"));

// ---------- MongoDB Connection ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Failed:", err.message));

// ---------- Start Server ----------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
