const queensData = {
  "Sasha Colby": {
    season: "US15",
    placement: "1st",
    age: 37,
    country: "USA"
  },
  "Jimbo": {
    season: "CA1",
    placement: "4th",
    age: 40,
    country: "Canada"
  },
  "Tia Kofi": {
    season: "UK2",
    placement: "7th",
    age: 33,
    country: "UK"
  }
};

const correctQueen = "Sasha Colby";
let guessNumber = 1;

document.getElementById("guessForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const guessName = document.getElementById("queen").value.trim();

  if (!queensData[guessName]) {
    alert("Queen not in database.");
    return;
  }

  const guess = queensData[guessName];
  const correct = queensData[correctQueen];

  const table = document.getElementById("guessTable").getElementsByTagName("tbody")[0];
  const row = table.insertRow();

  function colorCell(cell, val, correctVal) {
    if (val === correctVal) {
      cell.classList.add("green");
    } else if (Object.values(correct).includes(val)) {
      cell.classList.add("yellow");
    } else {
      cell.classList.add("gray");
    }
    cell.textContent = val;
  }

  row.insertCell().textContent = guessNumber++;
  colorCell(row.insertCell(), guessName, correctQueen);
  colorCell(row.insertCell(), guess.season, correct.season);
  colorCell(row.insertCell(), guess.placement, correct.placement);
  colorCell(row.insertCell(), guess.age, correct.age);
  colorCell(row.insertCell(), guess.country, correct.country);

  document.getElementById("queen").value = "";

  if (guessName === correctQueen) {
    alert("🎉 You got it!");
  }
});
