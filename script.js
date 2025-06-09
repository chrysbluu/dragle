// Placeholder queen data
const queens = {
  "Sasha Colby": { season: "US15", placement: "1", country: "USA" },
  "Symone": { season: "US13", placement: "1", country: "USA" },
  "Priyanka": { season: "Canada1", placement: "1", country: "Canada" },
};

const correctQueen = "Sasha Colby";
let tries = 0;
let maxTries = 5;

// Fill dropdown (datalist)
window.onload = () => {
  const datalist = document.getElementById("queen-options");
  Object.keys(queens).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });
};

// Main guess function
function submitGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.trim();
  const table = document.getElementById("guess-table");
  const triesLeft = document.getElementById("tries-left");
  const result = document.getElementById("game-result");

  if (!queens[guess] || tries >= maxTries) return;

  const data = queens[guess];
  const correct = queens[correctQueen];

  // Create row of feedback
  const row = document.createElement("div");
  row.innerHTML = `
    <p>
      ${guess} | 
      <span class="${data.season === correct.season ? 'correct' : 'incorrect'}">S: ${data.season}</span> |
      <span class="${data.placement === correct.placement ? 'correct' : 'incorrect'}">P: ${data.placement}</span> |
      <span class="${data.country === correct.country ? 'correct' : 'incorrect'}">C: ${data.country}</span>
    </p>
  `;
  table.appendChild(row);

  // Update try count
  tries++;
  triesLeft.innerText = \`Tries: \${tries}/\${maxTries}\`;

  // Check win or lose
  if (guess === correctQueen) {
    result.innerText = "🎉 Correct! You win!";
  } else if (tries >= maxTries) {
    result.innerText = "😢 Out of tries! The queen was " + correctQueen;
  }

  // Clear input
  input.value = "";
}

// Make function global so button can use it
window.submitGuess = submitGuess;
