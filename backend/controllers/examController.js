const Question = require('../models/Question');


exports.getQuestions = async (req, res) => {
try {
const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
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