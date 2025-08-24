const Question = require('../models/Question');


exports.getQuestions = async (req, res) => {
  try {
    const total = await Question.countDocuments();
    if (total === 0) {
      return res.status(404).json({ message: "No questions available" });
    }

    const questions = await Question.aggregate([{ $sample: { size: Math.min(5, total) } }]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.submitExam = async (req, res) => {
try {
const { answers } = req.body;
const questions = await Question.find({});


let score = 0;
answers.forEach((ans, i) => {
if (questions[i] && questions[i].correctAnswer === ans) score++;
});


res.json({ score, total: questions.length });
} catch (err) {
res.status(500).json({ error: err.message });
}
};