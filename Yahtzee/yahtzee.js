window.onload = yahtzeeGame;

function yahtzeeGame () {

	var upperSecAccumulator = 0;
	var yahtzeeScore = 50;
	var totalElm = document.getElementById("totalScore");
	var rolls = 0;
	var held = [false, false, false, false, false];
	var dice = [document.getElementById("0"), document.getElementById("1"), document.getElementById("2"), document.getElementById("3"), document.getElementById("4")];

	
	function total (value) {

		totalElm.innerHTML = Number(totalElm.innerHTML) + value;
	};



	function updateHeld (id) {

		for(var i = 0; i<5; i++) {

			held[i] = document.getElementById("hold" + i).checked;
		}
	};
	function updateScores() {
		
		var onesScore = upperSecScore(1);
		var twosScore = upperSecScore(2);
		var threesScore = upperSecScore(3);
		var foursScore = upperSecScore(4);
		var fivesScore = upperSecScore(5);
		var sixesScore = upperSecScore(6);
	;
		
	document.getElementById("onesScore").innerHTML = onesScore;
	document.getElementById("twosScore").innerHTML = twosScore;
	document.getElementById("threesScore").innerHTML = threesScore;
	document.getElementById("foursScore").innerHTML = foursScore;
	document.getElementById("fivesScore").innerHTML = fivesScore;
	document.getElementById("sixesScore").innerHTML = sixesScore;
		
	};


	function roll () {

		if(rolls < 3) {

			for(var i = 0; i<5; i++) {

				if(held[i] === false || rolls === 0) {

					dice[i].innerHTML = Math.floor(Math.random() * 6) + 1;
				}
			}
			rolls++;
			updateScores();
		}
	};

	function rollReset () {

		rolls = 0;

		for(var i = 0; i<5; i++) {

			dice[i].innerHTML = 0;
		}
	};

	function disable (name) {

		var elm = document.getElementById(name);
		elm.classList.add("strike");
		elm.classList.remove("cell");
		elm.onclick = undefined;
	};
	for(var i = 0; i<5; i++) {

		document.getElementById("hold" + i).onclick = updateHeld;
	}

	function cellScore (name, value) {

		document.getElementById(name + "Score").innerHTML = value;
		rollReset();
		disable(name);
		total(value);
	};

	function sumDice() {

		var accumulator = 0;

		for(var i = 0; i<5; i++) {

			accumulator = accumulator + Number(dice[i].innerHTML);
		}

		return accumulator;
	};

	document.getElementById("roll").onclick = roll;

	
	function upperSecScore(value) {
		return dice.reduce((accumulator, die) => (Number(die.innerHTML) === value) ? accumulator + value : accumulator, 0);
	  }
	  
	  function upperSec(name, value) {
		function ups() {
		  if (rolls > 0) {
			const upperScore = upperSecScore(value);
			upperSecAccumulator += upperScore;
			cellScore(name, upperScore);
			checkUpperBonus();
		  }
		}
		return ups;
	  }
	
	  document.getElementById("ones").onclick = upperSec("ones", 1);
	  document.getElementById("twos").onclick = upperSec("twos", 2);
	  document.getElementById("threes").onclick = upperSec("threes", 3);
	  document.getElementById("fours").onclick = upperSec("fours", 4);
	  document.getElementById("fives").onclick = upperSec("fives", 5);
	  document.getElementById("sixes").onclick = upperSec("sixes", 6);
	



	function kindS (value, kindVal) { 

		var numbersOfAKind = 0;

		for(var i = 0; i<5; i++) {

			if(Number(dice[i].innerHTML) === value) {

				numbersOfAKind = numbersOfAKind + 1;
			}
		}

		if(numbersOfAKind >= kindVal) {

			return sumDice();

		} else {

			return 0;
		}
	};

	function kind(kindVal) {
		function ki() {
		  var diceCounts = [0, 0, 0, 0, 0, 0]; 
		  var score = 0;
	  
		  for (var i = 0; i < 5; i++) {
			var value = Number(dice[i].innerHTML);
			diceCounts[value - 1]++; 
		  }
	  
		  for (var j = 0; j < 6; j++) {
			if (diceCounts[j] >= kindVal) {
			  score = sumDice();
			  break; 
			}
		  }
	  
		  if (score) {
			if (kindVal === 3) {
			  cellScore("threeOfAKind", score);
			} else {
			  cellScore("fourOfAKind", score);
			}
		  }
		};
	  
		return ki;
	  }
	  
	  document.getElementById("threeOfAKind").onclick = kind(3);
	  document.getElementById("fourOfAKind").onclick = kind(4);


	

	  document.getElementById("fullHouse").onclick = fullHouse;

	function fullHouse() {
		const kindCounts = new Array(7).fill(0);
	  
		for (let i = 0; i < 5; i++) {
		  kindCounts[Number(dice[i].innerHTML)]++;
		}
	  
		let threeOfAKindFound = false;
		let twoOfAKindFound = false;
	  
		for (let i = 1; i < 7; i++) {
		  if (kindCounts[i] === 3) {
			threeOfAKindFound = true;
		  } else if (kindCounts[i] === 2) {
			twoOfAKindFound = true;
		  }
		}
	  
		if (threeOfAKindFound && twoOfAKindFound) {
		  cellScore("fullHouse", 25);
		}
	  }

	function searchDice (val) { 

		var foundDice = false;

		for(var i = 0; i<5; i++) {

			if(Number(dice[i].innerHTML) === val) {

				foundDice = true;
			}
		}

		return foundDice;
	};

	function checkStraightCombo(search) {
		return search.every((value) => searchDice(value));
	  }
	  
	  function straight(smallOrLarge) {
		return function () {
		  const combos = smallOrLarge
			? [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
			: [[1, 2, 3, 4, 5], [2, 3,4,5, 6]];
	  
		  if (combos.some((combo) => checkStraightCombo(combo))) {
			cellScore(smallOrLarge ? "smallStraight" : "largeStraight", smallOrLarge ? 30 : 40);
		  }
		};
	  }

	  document.getElementById("smallStraight").onclick = straight(true);
	  document.getElementById("largeStraight").onclick = straight(false);

	

	function chance () {

		if(rolls > 0) cellScore("chance", sumDice());
	};

	document.getElementById("chance").onclick = chance;



	function yahtzee() {
		if (rolls > 0) {
		  let match = false;
	  
		  for (let i = 1; i < 7; i++) {
			if (kindS(i, 5)) {
			  match = true;
			  break; // Exit the loop once a match is found
			}
		  }
	  
		  if (match) {
			cellScore("yahtzee", yahtzeeScore);
			yahtzeeScore = 100;
			yahtzeeExtend();
		  }
		}
	}

	document.getElementById("yahtzee").onclick = yahtzee;

	

	function checkUpperBonus () {

		if(upperSecAccumulator > 62) cellScore("upperSecBonus", 35);
	};

	

	function yahtzeeExtend() {
		const yahtzeeCell = document.getElementById("yahtzee");
		const yahtzeeScoreCell = document.getElementById("yahtzeeScore");
	  
		yahtzeeCell.removeAttribute("id");
		yahtzeeScoreCell.removeAttribute("id");
	  
		yahtzeeCell.innerHTML = "Yahtzee";
		yahtzeeScoreCell.innerHTML = "-";
		yahtzeeCell.setAttribute("class", "cell");
		yahtzeeCell.onclick = yahtzee;
	  }

	function end() {
		location.reload(); 
	};
	document.getElementById("end").onclick = end;
};