const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/Question');


dotenv.config();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


const seedQuestions = async () => {
await Question.deleteMany();
await Question.insertMany([
{ question: '2+2=?', options: ['3','4','5','6'], correctAnswer: 1 },
{ question: 'Capital of France?', options: ['Berlin','Paris','London','Rome'], correctAnswer: 1 },
{ question: 'React is a?', options: ['Library','Framework','Language','Tool'], correctAnswer: 0 },
{ question: 'MongoDB is?', options: ['SQL DB','NoSQL DB','Spreadsheet','API'], correctAnswer: 1 },
{ question: 'Node.js is built on?', options: ['V8 Engine','JVM','.NET','PHP'], correctAnswer: 0 },
]);
console.log('Questions seeded');
process.exit();
};


seedQuestions();