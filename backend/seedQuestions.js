 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/questionModel"); // adjust path if needed

dotenv.config();

const questions = [
  {
    questionText: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    questionText: "What is the capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    correctAnswer: "Paris",
  },
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Question.deleteMany(); // clear old questions
    await Question.insertMany(questions);

    console.log("✅ Questions seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding questions:", error);
    process.exit(1);
  }
};

seedQuestions();
