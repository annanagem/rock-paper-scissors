const resultsDiv = document.getElementById("results");
const startButton = document.getElementById("start-game");
const nextButton = document.getElementById("next-round");
const restartButton = document.getElementById("restart-game");

let hScore = 0;
let cScore = 0;
let currentRound = 1;
const maxRounds = 5;

function printToPage(message) {
  const p = document.createElement("p");
  p.textContent = message;
  resultsDiv.appendChild(p);
}

function getComputerChoice(pcValue) {
  if (pcValue === 1) return "rock";
  if (pcValue === 2) return "paper";
  return "scissors";
}

function playRound(hChoice, cChoice) {
  if (hChoice === cChoice) {
    printToPage("Result: It's a tie!");
    return;
  }
  if (
    (hChoice === "rock" && cChoice === "scissors") ||
    (hChoice === "paper" && cChoice === "rock") ||
    (hChoice === "scissors" && cChoice === "paper")
  ) {
    printToPage("Result: You won this round!");
    hScore++;
  } else {
    printToPage("Result: You lost this round!");
    cScore++;
  }
}

function finalScore() {
  if (hScore > cScore) return "You won the game!";
  if (hScore < cScore) return "You lost the game!";
  return "The game ended in a tie!";
}

function handleRound() {
  if (currentRound > maxRounds) return;

  let humanChoice = prompt("What's your choice: Rock, Paper or Scissors?");
  if (!humanChoice) {
    printToPage("Round cancelled (no input).");
    return;
  }

  let hChoice = humanChoice.toLowerCase();
  if (!["rock", "paper", "scissors"].includes(hChoice)) {
    printToPage(`Invalid choice: "${humanChoice}". Please type rock, paper, or scissors.`);
    return;
  }

  const pcValue = Math.floor(Math.random() * 3) + 1;
  const cChoice = getComputerChoice(pcValue);

  printToPage(`----- Round ${currentRound} -----`);
  printToPage(`You chose: ${hChoice}`);
  printToPage(`Computer chose: ${cChoice}`);

  playRound(hChoice, cChoice);

  if (currentRound === maxRounds) {
    printToPage("----- Game Over -----");
    printToPage(`Final score - You: ${hScore} | Computer: ${cScore}`);
    printToPage(finalScore());

    nextButton.style.display = "none"; // hide next-round button
    restartButton.style.display = "inline-block"; // SHOW restart button
  }

  currentRound++;
}

// Start button
startButton.addEventListener("click", () => {
  handleRound();
  startButton.style.display = "none";
  nextButton.style.display = "inline-block";
});

// Next round button
nextButton.addEventListener("click", handleRound);

// ⭐ NEW: Restart button
restartButton.addEventListener("click", () => {
  // reset game state
  hScore = 0;
  cScore = 0;
  currentRound = 1;

  // clear previous results
  resultsDiv.innerHTML = "";

  // reset buttons
  restartButton.style.display = "none";
  nextButton.style.display = "none";
  startButton.style.display = "inline-block";
});
