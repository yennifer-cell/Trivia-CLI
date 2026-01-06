// trivia-game.js
// A CLI Trivia Game in JavaScript

const readline = require('readline');

// Setup CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Quiz questions as an array of objects
const questions = [
  {
    question: "What is the capital of France?",
    options: ["1. Berlin", "2. Madrid", "3. Paris", "4. Rome"],
    answer: 3
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["1. Venus", "2. Mars", "3. Jupiter", "4. Saturn"],
    answer: 2
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["1. Charles Dickens", "2. William Shakespeare", "3. Mark Twain", "4. J.K. Rowling"],
    answer: 2
  },
  {
    question: "What is 9 * 9?",
    options: ["1. 81", "2. 72", "3. 99", "4. 91"],
    answer: 1
  }
];

// Global variables for score and timer
let score = 0;
let questionIndex = 0;
let timer;
const timePerQuestion = 15; // seconds

// Start the game
function startGame() {
  console.log("Welcome to the CLI Trivia Game!");
  console.log("You have " + timePerQuestion + " seconds to answer each question.");
  console.log("Type the number corresponding to your answer.\n");
  askQuestion();
}

// Function to ask a question
function askQuestion() {
  if (questionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[questionIndex];

  console.log(`Question ${questionIndex + 1}: ${currentQuestion.question}`);
  currentQuestion.options.forEach(option => console.log(option));

  let timeLeft = timePerQuestion;

  // Start countdown timer for this question
  timer = setInterval(() => {
    timeLeft--;
    process.stdout.write(`Time left: ${timeLeft}s\r`);
    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log("\nTime's up!");
      questionIndex++;
      askQuestion();
    }
  }, 1000);

  // Prompt user for input
  rl.question("\nYour answer: ", (input) => {
    clearInterval(timer);
    validateAnswer(input, currentQuestion.answer);
    questionIndex++;
    askQuestion();
  });
}

// Function to validate the answer
function validateAnswer(userInput, correctAnswer) {
  const userAnswer = parseInt(userInput);

  if (userAnswer === correctAnswer) {
    console.log("✅ Correct!\n");
    score++;
  } else {
    console.log(`❌ Incorrect! The correct answer was ${correctAnswer}.\n`);
  }
}

// End game and display score
function endGame() {
  console.log("\n🎉 Game Over!");
  console.log(`Your final score: ${score} / ${questions.length}`);

  // Display a message based on performance
  const feedback = score === questions.length ? "Perfect score! You're a trivia master!" :
                  score >= questions.length / 2 ? "Nice job! You did well." :
                  "Better luck next time!";
  console.log(feedback);

  rl.close();
}

// Start the game
startGame();
