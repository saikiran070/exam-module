const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Get all questions (without sending answers)
router.get("/questions", authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find().select("-answer"); // hide correct answer
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit exam answers
router.post("/submit", authMiddleware, async (req, res) => {
  const { answers } = req.body; // { questionId: selectedIndex }
  try {
    const user = await User.findById(req.user.id);

    if (user.examScore !== null) {
      return res.status(400).json({ message: "Exam already submitted" });
    }

    let score = 0;

    // Get all questions to check answers
    const questions = await Question.find();
    questions.forEach(q => {
      if (answers[q._id] === q.answer) score += 1;
    });

    user.examScore = score;
    await user.save();

    res.status(200).json({ message: "Exam submitted", score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's exam score
router.get("/score", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("examScore name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ score: user.examScore, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
