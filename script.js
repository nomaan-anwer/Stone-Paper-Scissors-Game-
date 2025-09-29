const choices = ["stone", "paper", "scissors"];
const userScoreEl = document.getElementById("user-score");
const botScoreEl = document.getElementById("bot-score");
const resultEl = document.getElementById("result");
const buttons = document.querySelectorAll(".choice");

let userScore = 0;
let botScore = 0;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.choice;
    playRound(userChoice);
  });
});

function playRound(userChoice) {
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  const result = getResult(userChoice, botChoice);

  displayResult(result, userChoice, botChoice);
  updateScores(result);
}

function getResult(user, bot) {
  if (user === bot) return "draw";

  if (
    (user === "stone" && bot === "scissors") ||
    (user === "paper" && bot === "stone") ||
    (user === "scissors" && bot === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function displayResult(result, userChoice, botChoice) {
  let message = "";

  if (result === "win") {
    message = `🎉 You win! ${format(userChoice)} beats ${format(botChoice)}`;
  } else if (result === "lose") {
    message = `😞 You lose! ${format(botChoice)} beats ${format(userChoice)}`;
  } else {
    message = `🤝 It's a draw! You both chose ${format(userChoice)}`;
  }

  resultEl.textContent = message;
  resultEl.style.animation = "none";
  void resultEl.offsetWidth; // Force reflow for animation
  resultEl.style.animation = "fadeIn 0.4s ease-in-out forwards";
}
function updateScores(result) {
  if (result === "win") {
    userScore++;
    userScoreEl.textContent = userScore;
  } else if (result === "lose") {
    botScore++;
    botScoreEl.textContent = botScore;
  }

  if (userScore === 5 || botScore === 5) {
    const winner = userScore === 5 ? "You" : "Bot";
    resultEl.textContent = `${winner} won the game! 🎉 Refresh to play again.`;

    // Disable all buttons
    buttons.forEach(button => button.disabled = true);
  }
}


function format(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
