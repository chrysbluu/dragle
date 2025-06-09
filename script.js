const queens = {
  "Sasha Colby": { season: "US15", placement: "1", country: ":american_flag:" },
  "Symone": { season: "US13", placement: "1", country: "🇺🇸" },
  "Priyanka": { season: "Canada1", placement: "1", country: ":canadian_flag:" },
};

let correctQueen = "Sasha Colby";
let tries = 0;
let maxTries = 5;
let streak = parseInt(localStorage.getItem("streak") || "0");
let highScore = parseInt(localStorage.getItem("highScore") || "0");
let dailyMode = false;

window.addEventListener("DOMContentLoaded", () => {
  const datalist = document.getElementById("queen-options");
  Object.keys(queens).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });

  updateStats();
  document.getElementById("submit-btn").addEventListener("click", submitGuess);
  document.getElementById("mode-toggle").addEventListener("click", toggleMode);
});

function updateStats() {
  document.getElementById("streak-info").innerText = `🔥 Streak: ${streak} | 🏆 High Score: ${highScore}`;
  document.getElementById("tries-left").innerText = `Tries: ${tries}/${maxTries}`;
}

function toggleMode() {
  dailyMode = !dailyMode;
  document.getElementById("mode-toggle").innerText = dailyMode ? "Switch to Endless Mode" : "Switch to Daily Mode";
  resetGame();
}

function resetGame() {
  tries = 0;
  correctQueen = "Sasha Colby"; // Replace with real random/daily logic
  document.getElementById("guess-input").value = "";
  document.getElementById("guess-table").innerHTML = "";
  document.getElementById("game-result").innerText = "";
  updateStats();
}

function submitGuess() {
  const guess = document.getElementById("guess-input").value.trim();
  const table = document.getElementById("guess-table");
  const result = document.getElementById("game-result");

  if (!queens[guess] || tries >= maxTries) return;

  const data = queens[guess];
  const correct = queens[correctQueen];

  const seasonHint = data.season === correct.season ? '🟩' : (data.season > correct.season ? '🔽' : '🔼');
  const placeHint = data.placement === correct.placement ? '🟩' : '🟥';
  const countryHint = data.country === correct.country ? '🟩' : '🟥';

  const row = document.createElement("div");
  row.innerHTML = `
    <p><strong>${guess}</strong> |
    Season: ${data.season} ${seasonHint} |
    Placement: ${data.placement} ${placeHint} |
    Country: ${data.country} ${countryHint}</p>
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
