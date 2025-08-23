const express = require('express');
const { getQuestions, submitExam } = require('../controllers/examController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/questions', auth, getQuestions);


router.post('/submit', auth, submitExam);


module.exports = router;
