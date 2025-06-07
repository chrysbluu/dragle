function checkGuess() {
  const input = document.getElementById("guessInput").value.trim();
  const guess = queens.find(q => q.name.toLowerCase() === input.toLowerCase());

  const resultDiv = document.getElementById("result");
  if (!guess) {
    resultDiv.innerHTML = "Queen not found. Try again!";
    return;
  }

  let feedback = `<h3>${guess.name}</h3><img src="${guess.image}" alt="${guess.name}" width="200"><ul>`;
  feedback += `<li><strong>Season:</strong> ${guess.season === answer.season ? "✅" : `❌ (${guess.season})`}</li>`;
  feedback += `<li><strong>Placement:</strong> ${guess.placement === answer.placement ? "✅" : `⬆️⬇️ (${guess.placement})`}</li>`;
  feedback += `<li><strong>Wins:</strong> ${guess.wins === answer.wins ? "✅" : `(${guess.wins})`}</li>`;
  feedback += `<li><strong>Country:</strong> ${guess.country === answer.country ? "✅" : `❌ (${guess.country})`}</li>`;
  feedback += `</ul>`;

  resultDiv.innerHTML = feedback;

  if (guess.name === answer.name) {
    resultDiv.innerHTML += `<p>🎉 You guessed it!</p><button onclick="newRound()">New Queen</button>`;
  }
}

function newRound() {
  answer = queens[Math.floor(Math.random() * queens.length)];
  document.getElementById("guessInput").value = "";
  document.getElementById("result").innerHTML = "";
}
