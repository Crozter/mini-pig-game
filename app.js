/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, count;

init();

// document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector("#score-0").textContent;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOMFirst = document.querySelector(".dice-1");
    diceDOMFirst.style.display = "block";
    diceDOMFirst.src = "dice-" + dice1 + ".png";

    var diceDOMSecond = document.querySelector(".dice-2");
    diceDOMSecond.style.display = "block";
    diceDOMSecond.src = "dice-" + dice2 + ".png";

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += (dice1 + dice2);
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }

    // Check if the person rolls two 6 in a row
    if(dice === 6) {
      count++;

      if(count === 2) {
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      }
    } else {
      count = 0;
    }

    // Disable input field
    document.getElementById("score-limit").disabled = true;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    // Check if the player won the game
    if (scores[activePlayer] >= document.getElementById("score-limit").value) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice-1").style.display = "none";
      document.querySelector(".dice-2").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }

    // Reset count
    count = 0;
  }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  count = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  count = 0;

  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.getElementById("score-limit").value = "100";

  document.getElementById("score-limit").disabled = false;
}