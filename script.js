const queens = {
  "Sasha Colby": { season: "US15", placement: "1", country: "🇺🇸" },
  "Symone": { season: "US13", placement: "1", country: "🇺🇸" },
  "Priyanka": { season: "Canada1", placement: "1", country: "🇨🇦" },
};

const queenNames = Object.keys(queens);
let correctQueen = "";
let tries = 0;
const maxTries = 5;
let streak = parseInt(localStorage.getItem("streak") || "0");
let highScore = parseInt(localStorage.getItem("highScore") || "0");
let dailyMode = false;

window.addEventListener("DOMContentLoaded", () => {
  // Fill datalist
  const datalist = document.getElementById("queen-options");
  queenNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });

  // Set up mode toggle
  const toggle = document.getElementById("mode-toggle");
  if (toggle) toggle.addEventListener("click", toggleMode);

  // Submit button
  document.getElementById("submit-btn").addEventListener("click", submitGuess);

  // Pick queen
  setCorrectQueen();
  updateStats();
});

function setCorrectQueen() {
  if (dailyMode) {
    const today = new Date().toISOString().split('T')[0];
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    correctQueen = queenNames[seed % queenNames.length];
  } else {
    correctQueen = queenNames[Math.floor(Math.random() * queenNames.length)];
  }
}

function toggleMode() {
  dailyMode = !dailyMode;
  document.getElementById("mode-toggle").innerText = dailyMode ? "Switch to Endless Mode" : "Switch to Daily Mode";
  resetGame();
}

function resetGame() {
  tries = 0;
  setCorrectQueen();
  document.getElementById("guess-input").value = "";
  document.getElementById("guess-table").innerHTML = "";
  document.getElementById("game-result").innerText = "";
  updateStats();
}

function updateStats() {
  document.getElementById("streak-info").innerText = `🔥 Streak: ${streak} | 🏆 High Score: ${highScore}`;
  document.getElementById("tries-left").innerText = `Tries: ${tries}/${maxTries}`;
}

function submitGuess() {
  const guess = document.getElementById("guess-input").value.trim();
  const table = document.getElementById("guess-table");
  const result = document.getElementById("game-result");

  if (!queens[guess] || tries >= maxTries) return;

  const data = queens[guess];
  const correct = queens[correctQueen];

  // Hints
  const seasonHint = data.season > correct.season ? "🔽" : data.season < correct.season ? "🔼" : "";
  const placeHint = parseInt(data.placement) > parseInt(correct.placement) ? "🔽" :
                    parseInt(data.placement) < parseInt(correct.placement) ? "🔼" : "";
  const countryHint = ""; // Just use color

  // Row with colored hints
  const row = document.createElement("div");
  row.innerHTML = `
    <div class="guess-row">
      <span class="cell">${guess}</span>
      <span class="cell" style="background-color: ${data.season === correct.season ? '#9CCC65' : '#E57373'}">
        ${data.season} ${seasonHint}
      </span>
      <span class="cell" style="background-color: ${data.placement === correct.placement ? '#9CCC65' : '#E57373'}">
        ${data.placement} ${placeHint}
      </span>
      <span class="cell" style="background-color: ${data.country === correct.country ? '#9CCC65' : '#E57373'}">
        ${data.country}
      </span>
    </div>
  `;
  table.appendChild(row);

  tries++;
  updateStats();

  if (guess === correctQueen) {
    result.innerText = "🎉 Correct! You win!";
    if (dailyMode) {
      streak++;
      if (streak > highScore) highScore = streak;
    }
    localStorage.setItem("streak", streak);
    localStorage.setItem("highScore", highScore);
  } else if (tries >= maxTries) {
    result.innerText = `😢 Out of tries! It was ${correctQueen}`;
    if (dailyMode) streak = 0;
    localStorage.setItem("streak", streak);
  }

  document.getElementById("guess-input").value = "";
}
