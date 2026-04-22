// trivia.js
const readline = require("readline");

// Create interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Questions Array (Objects)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
    answer: "C"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["A. Java", "B. C", "C. Python", "D. JavaScript"],
    answer: "D"
  },
  {
    question: "What does CLI stand for?",
    options: [
      "A. Command Line Interface",
      "B. Computer Linked Interface",
      "C. Code Level Input",
      "D. Central Logic Interface"
    ],
    answer: "A"
  }
];

// Global variables
let score = 0;
let currentQuestionIndex = 0;
const TIME_LIMIT = 10000; // 10 seconds

// Start Game
function startGame() {
  console.log(" Welcome to the Trivia CLI Game!");
  console.log("You have 10 seconds per question.\n");

  askQuestion();
}

// Ask Question
function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];

  console.log(`\nQuestion ${currentQuestionIndex + 1}:`);
  console.log(currentQuestion.question);

  // Array iteration (map)
  currentQuestion.options.map(option => console.log(option));

  let timer;

  // Timer for question
  const timeout = setTimeout(() => {
    console.log("Time's up!");
    currentQuestionIndex++;
    askQuestion();
  }, TIME_LIMIT);

  rl.question("\nYour answer: ", (userAnswer) => {
    clearTimeout(timeout); // stop timer if answered

    if (userAnswer.toUpperCase() === currentQuestion.answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log(`Incorrect! Correct answer: ${currentQuestion.answer}`);
    }

    currentQuestionIndex++;
    askQuestion();
  });
}

// End Game
function endGame() {
  console.log("Game Over!");
  console.log(`Your final score: ${score}/${questions.length}`);

  // Performance feedback
  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    console.log("Perfect score!");
  } else if (percentage >= 60) {
    console.log("Good job!");
  } else {
    console.log("Keep practicing!");
  }

  rl.close();
}

// Run the game
startGame();
