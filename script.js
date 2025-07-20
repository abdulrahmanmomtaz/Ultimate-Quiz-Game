const questions = [
  { q: "What is the capital of France?", a: "Paris", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { q: "2 + 2 * 2 = ?", a: "6", options: ["4", "6", "8", "10"] },
  { q: "What is the chemical symbol for Gold?", a: "Au", options: ["Gd", "Ag", "Au", "Pb"] },
  { q: "Who wrote '1984'?", a: "George Orwell", options: ["Shakespeare", "George Orwell", "J.K. Rowling", "Mark Twain"] },
  { q: "Which planet is known as the Red Planet?", a: "Mars", options: ["Venus", "Mars", "Jupiter", "Saturn"] },
  { q: "√144 = ?", a: "12", options: ["14", "13", "12", "10"] },
  { q: "Binary of 10 is?", a: "1010", options: ["1001", "1010", "1100", "1111"] },
  { q: "Who painted Mona Lisa?", a: "Leonardo da Vinci", options: ["Picasso", "Da Vinci", "Michelangelo", "Van Gogh"] },
  { q: "In what year did WW2 end?", a: "1945", options: ["1939", "1941", "1945", "1950"] },
  { q: "Hardest natural substance?", a: "Diamond", options: ["Gold", "Iron", "Diamond", "Platinum"] },
];

let currentQuestion = 0;
let score = 0;
let playerName = "";

function startGame() {
  playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    alert("Please enter your name!");
    return;
  }
  document.querySelector(".start-screen").classList.add("hidden");
  document.querySelector(".game-container").classList.remove("hidden");
  document.getElementById("playerDisplay").textContent = `Player: ${playerName}`;
  score = 0;
  currentQuestion = 0;
  loadQuestion();
}

function loadQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("questionText").textContent = question.q;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].a;
  if (selected === correct) score += 10;
  else score -= 5;

  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length) {
    loadQuestion();
  }
}

function endGame() {
  document.querySelector(".game-container").classList.add("hidden");
  document.querySelector(".end-screen").classList.remove("hidden");
  document.getElementById("finalScore").textContent = `Your Score: ${score}`;

  saveScore(playerName, score);
  showLeaderboard();
}

function restartGame() {
  document.querySelector(".end-screen").classList.add("hidden");
  document.querySelector(".start-screen").classList.remove("hidden");
  document.getElementById("playerName").value = "";
}

function saveScore(name, score) {
  const data = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
  data.push({ name, score });
  localStorage.setItem("quizLeaderboard", JSON.stringify(data));
}

function showLeaderboard() {
  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
  data.sort((a, b) => b.score - a.score);

  data.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} - ${entry.score} pts`;
    list.appendChild(li);
  });
}

window.onload = showLeaderboard;
