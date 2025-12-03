function getComputerChoice(pcValue) {
if (pcValue === 1) {
    return "rock";
    
}
else if (pcValue === 2) {
    return "paper";
   
}
else if (pcValue === 3) {
    return "scissors";  
    
}
}

let hScore = 0;
let cScore = 0;

function playRound(hChoice, cChoice) {
    if (hChoice === cChoice) {
        console.log("It's a tie!");
        return;
    }
    else if (
        (hChoice === "rock" && cChoice === "scissors") ||
        (hChoice === "paper" && cChoice === "rock") ||
        (hChoice === "scissors" && cChoice === "paper")
    ) {
        console.log("You won!");
        hScore++;
    }
    else {
        console.log("You lost!");
        cScore++;
    }
}

function playGame() {
    for (let i = 1; i <=5; i++) {
        console.log(`Round ${i}`);

let pcValue = Math.floor(Math.random() * 3) + 1;
let cChoice = getComputerChoice(pcValue);

let humanChoice = prompt("What's your choice: Rock, Paper or Scissors?");
let hChoice = humanChoice.toLowerCase();

        playRound(hChoice, cChoice);
    }

    console.log("Result:");
    console.log(finalScore());
    console.log("Final score:");
    console.log("Human:", hScore);
    console.log("Computer:", cScore);
}

    function finalScore() {
        if (hScore > cScore) {
            return "You won!";
        }
        else if (hScore < cScore) {
            return "You lost!";
        }
        else {
            return "It's a tie!";
        }
    }

playGame();