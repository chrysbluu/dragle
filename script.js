
const queens = {
  "Sasha Colby": { season: "US15", placement: "1", country: "USA" },
  "Symone": { season: "US13", placement: "1", country: "USA" },
  "Priyanka": { season: "Canada1", placement: "1", country: "Canada" },
  // Add more once data is parsed
};

const correctQueen = "Sasha Colby";
let tries = 0;
let maxTries = 5;

const datalist = document.getElementById("queen-options");
Object.keys(queens).forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  datalist.appendChild(option);
});

function submitGuess() {
  const guess = document.getElementById("guess-input").value;
  const table = document.getElementById("guess-table");
  const triesLeft = document.getElementById("tries-left");

  if (!queens[guess] || tries >= maxTries) return;

  const data = queens[guess];
  const correct = queens[correctQueen];

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

  tries++;
  triesLeft.innerText = \`Tries: \${tries}/\${maxTries}\`;

  if (guess === correctQueen) {
    document.getElementById("game-result").innerText = "🎉 Correct! You win!";
  } else if (tries >= maxTries) {
    document.getElementById("game-result").innerText = "😢 Out of tries! The queen was " + correctQueen;
  }

  document.getElementById("guess-input").value = "";
}
