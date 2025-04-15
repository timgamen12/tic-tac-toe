const boardEl = document.getElementById("game-board");
const statusEl = document.getElementById("game-status");
const resetBtn = document.getElementById("reset-btn");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const playAgainBtn = document.getElementById("play-again-btn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function initGame() {
  boardEl.innerHTML = "";
  gameState.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusEl.textContent = `${currentPlayer}'s Turn`;
  resultScreen.classList.add("hidden");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    boardEl.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("filled");

  if (checkWinner()) {
    showResult(`${currentPlayer} Wins! 🎉`);
    return;
  }

  if (!gameState.includes("")) {
    showResult("It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winPatterns.some(([a, b, c]) =>
    gameState[a] &&
    gameState[a] === gameState[b] &&
    gameState[b] === gameState[c]
  );
}

function showResult(message) {
  gameActive = false;
  resultMessage.textContent = message;
  resultScreen.classList.remove("hidden");
}

resetBtn.addEventListener("click", initGame);
playAgainBtn.addEventListener("click", initGame);

// Start the game
initGame();
