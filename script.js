// DRAGLE DATA
const queens = {
  "Sasha Colby": { season: "US15", placement: "1", country: "USA" },
  "Symone": { season: "US13", placement: "1", country: "USA" },
  "Priyanka": { season: "Canada1", placement: "1", country: "Canada" },
};

const correctQueen = "Sasha Colby";
let tries = 0;
let maxTries = 5;

// RUN THIS ONCE THE PAGE LOADS
window.addEventListener("DOMContentLoaded", () => {
  const datalist = document.getElementById("queen-options");
  const submitBtn = document.getElementById("submit-btn");

  // Fill dropdown options
  Object.keys(queens).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });

  // Attach button click event
  submitBtn.addEventListener("click", submitGuess);
});

function submitGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.trim();
  const table = document.getElementById("guess-table");
  const triesLeft = document.getElementById("tries-left");
  const result = document.getElementById("game-result");

  // Guess validation
  if (!queens[guess] || tries >= maxTries) {
    alert("Invalid queen or out of tries!");
    return;
  }

  const data = queens[guess];
  const correct = queens[correctQueen];

  // Create row feedback
  const row = document.createElement("div");
  row.innerHTML = `
    <p>
      <strong>${guess}</strong> | 
      <span class="${data.season === correct.season ? 'correct' : 'incorrect'}">Season: ${data.season}</span> |
      <span class="${data.placement === correct.placement ? 'correct' : 'incorrect'}">Place: ${data.placement}</span> |
      <span class="${data.country === correct.country ? 'correct' : 'incorrect'}">Country: ${data.country}</span>
    </p>
  `;
  table.appendChild(row);

  tries++;
  triesLeft.innerText = `Tries: ${tries}/${maxTries}`;

  if (guess === correctQueen) {
    result.innerText = "🎉 Correct! You win!";
  } else if (tries >= maxTries) {
    result.innerText = `😢 Out of tries! The correct answer was ${correctQueen}.`;
  }

  guessInput.value = "";
}
