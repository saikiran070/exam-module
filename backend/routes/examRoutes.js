const express = require('express');

const router = express.Router();
const examController = require('../controllers/examController');

// GET 5 random questions
router.get('/questions', examController.getQuestions);

// Submit answers
router.post('/submit', examController.submitExam);

module.exports = router;
