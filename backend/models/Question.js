const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // array of option strings
  answer: { type: Number, required: true }, // index of correct option
});


module.exports = mongoose.model("Question", questionSchema);
