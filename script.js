const queens = {
  "Sasha Colby": { season: "US15", placement: "1", country: "🇺🇸" },
  "Symone": { season: "US13", placement: "1", country: "🇺🇸" },
  "Priyanka": { season: "Canada1", placement: "1", country: "🇨🇦" },
};

const queenNames = Object.keys(queens);
let correctQueen = queenNames[Math.floor(Math.random() * queenNames.length)];
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
  document.getElementById("next-round-btn").addEventListener("click", nextRound);
});

function updateStats() {
  document.getElementById("streak-info").innerText = `🔥 Streak: ${streak} | 🏆 High Score: ${highScore}`;
  document.getElementById("tries-left").innerText = `Tries: ${tries}/${maxTries}`;
}

function toggleMode() {
  dailyMode = !dailyMode;
  document.getElementById("mode-toggle").innerText = dailyMode ? "Switch to Endless Mode" : "Switch to Daily Mode";

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

  resetGame();
}

function resetGame() {
  tries = 0;
  document.getElementById("guess-input").value = "";
  document.querySelector("#guess-table tbody").innerHTML = "";
  document.getElementById("game-result").innerText = "";
  document.getElementById("next-round-btn").style.display = "none";
  updateStats();
}

function submitGuess() {
  const guess = document.getElementById("guess-input").value.trim();
  const tableBody = document.querySelector("#guess-table tbody");
  const result = document.getElementById("game-result");

  if (!queens[guess] || tries >= maxTries) return;

  const data = queens[guess];
  const correct = queens[correctQueen];

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${guess}</td>
    <td class="cell ${data.season === correct.season ? 'correct' : 'incorrect'}">${data.season}</td>
    <td class="cell ${data.placement === correct.placement ? 'correct' : 'incorrect'}">${data.placement}</td>
    <td class="cell ${data.country === correct.country ? 'correct' : 'incorrect'}">${data.country}</td>
  `;
  tableBody.appendChild(row);

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

  if (guess === correctQueen || tries >= maxTries) {
    if (!dailyMode) {
      document.getElementById("next-round-btn").style.display = "inline-block";
    }
  }

  document.getElementById("guess-input").value = "";
}

function nextRound() {
  correctQueen = queenNames[Math.floor(Math.random() * queenNames.length)];
  resetGame();
}
