const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ Global CORS fix
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes'); // <-- added

app.use('/api/auth', authRoutes);
console.log("ExamRoutes:", examRoutes);
app.use('/api/exam', examRoutes); // <-- mounted exam routes

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ MongoDB connection (if using)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.error("❌ MongoDB Connection Failed:", err.message);
});

// ✅ Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
