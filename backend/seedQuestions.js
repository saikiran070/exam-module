const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: 1
  },
  {
    question: "Which language is used in React?",
    options: ["Python", "JavaScript", "C#", "Java"],
    answer: 1
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language",
      "None of the above",
    ],
    answer: 0
  },
  {
    question: "CSS is used for?",
    options: ["Styling", "Logic", "Database", "API"],
    answer: 0
  },
];

async function seed() {
  await Question.deleteMany(); // clear existing questions
  await Question.insertMany(questions);
  console.log("Questions added");
  mongoose.disconnect();
}

seed();
