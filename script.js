// ===== Buttons =====
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const restartButton = document.querySelector("#restart-game");

// ===== Results container =====
const resultsDiv = document.getElementById("results");

// ===== Game state =====
let hScore = 0;
let cScore = 0;
let currentRound = 1;
const maxRounds = 5;

// ===== Helpers =====
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function disableChoices() {
  rockButton.disabled = true;
  paperButton.disabled = true;
  scissorsButton.disabled = true;
}

function enableChoices() {
  rockButton.disabled = false;
  paperButton.disabled = false;
  scissorsButton.disabled = false;
}

// ===== Create round block =====
function createRoundContainer() {
  const roundDiv = document.createElement("div");
  roundDiv.classList.add("round");
  resultsDiv.appendChild(roundDiv);
  return roundDiv;
}

// ===== Game logic =====
function playRound(hChoice) {
  if (currentRound > maxRounds) return;

  const cChoice = getComputerChoice();
  const roundDiv = createRoundContainer();

  roundDiv.innerHTML += `<strong>Round ${currentRound}</strong><br>`;
  roundDiv.innerHTML += `You chose: ${hChoice}<br>`;
  roundDiv.innerHTML += `Computer chose: ${cChoice}<br>`;

  if (hChoice === cChoice) {
    roundDiv.innerHTML += "Result: It's a tie!";
    roundDiv.classList.add("tie");
  } else if (
    (hChoice === "rock" && cChoice === "scissors") ||
    (hChoice === "paper" && cChoice === "rock") ||
    (hChoice === "scissors" && cChoice === "paper")
  ) {
    roundDiv.innerHTML += "Result: You won this round!";
    roundDiv.classList.add("win");
    hScore++;
  } else {
    roundDiv.innerHTML += "Result: You lost this round!";
    roundDiv.classList.add("lose");
    cScore++;
  }

  if (currentRound === maxRounds) {
    const finalDiv = document.createElement("div");
    finalDiv.classList.add("round");
    finalDiv.innerHTML = `
      <strong>Game Over</strong><br>
      Final score:<br>
      You: ${hScore}<br>
      Computer: ${cScore}<br><br>
      ${hScore > cScore ? "You won the game!" :
        hScore < cScore ? "You lost the game!" :
        "The game ended in a tie!"}
    `;
    resultsDiv.appendChild(finalDiv);

    disableChoices();
    restartButton.style.display = "inline-block";
  }

  currentRound++;
}

// ===== Button events =====
rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));

restartButton.addEventListener("click", () => {
  hScore = 0;
  cScore = 0;
  currentRound = 1;
  resultsDiv.innerHTML = "";
  restartButton.style.display = "none";
  enableChoices();
});

// ===== Initial state =====
restartButton.style.display = "none";
enableChoices();
