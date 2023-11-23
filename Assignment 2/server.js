const express = require('express');
const bodyParser = require('body-parser');
const gameLogic = require('./yahtzee');
const app = express();
const port = 3000; 

app.use(bodyParser.json());




app.use(express.static('public'));
app.get('/roll-dice', (req, res) => {
let diceValue = Math.floor(Math.random() * 6) + 1;
res.json({ diceValue });
});


app.post('/kind', (req, res) => {
  const kindVal = req.body.kindVal;

  // Logic for the 'kind' function on the server
  const diceCounts = [0, 0, 0, 0, 0, 0];
  let score = 0;

  for (let i = 0; i < 5; i++) {
    const value = req.body.dice[i];
    diceCounts[value - 1]++;
  }

  for (let j = 0; j < 6; j++) {
    if (diceCounts[j] >= kindVal) {
      score = req.body.dice.reduce((acc, die) => acc + die, 0);
      break;
    }
  }

  if (score) {
    res.json({ score });
  } else {
    res.json({ score: 0 });
  }
});

app.post('/check-straight', (req, res) => {
  const isSmallStraight = req.body.isSmallStraight;
  const diceValues = req.body.dice;

  // Logic for checking if the straight is achieved
  const combos = isSmallStraight
    ? [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
    : [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]];

  const straightAchieved = combos.some(combo => combo.every(value => diceValues.includes(value)));

  res.json({ straightAchieved });
});

app.post('/yahtzee', (req, res) => {
  if (req.body.rolls > 0) {
    let match = false;

    for (let i = 1; i < 7; i++) {
      if (kindS(i, 5, req.body.dice)) {
        match = true;
        break; // Exit the loop once a match is found
      }
    }

    if (match) {
      res.json({ score: yahtzeeScore });
      yahtzeeScore = 100;
      yahtzeeExtend();
    } else {
      res.json({ score: 0 });
    }
  } else {
    res.json({ score: 0 });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
