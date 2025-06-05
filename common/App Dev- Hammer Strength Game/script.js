let needle = document.getElementById("needle");
let angle = 0;
let direction = 1;
let gameRunning = true;
let animationFrame;
let HitButton = document.getElementById("Hit");
let hammer = document.getElementById("hammer");
let scoreDisplay = document.getElementById("scoreDisplay");
let restartButton = document.getElementById("restart");
let content = document.getElementById("content");
let playerTurnDisplay = document.getElementById("playerTurn");

let player1 = "Player 1";
let player2 = "Player 2";
let currPlayer = player1;
let scores = {
    [player1]: 0,
    [player2]: 0
};

function needleSwing() {
    if (!gameRunning) return;

    let speed = 1.3 + Math.abs(angle) / 15;
    angle += direction * speed;

    if (angle >= 90) {
        angle = 90;
        direction = -1;
    } else if (angle <= -90) {
        angle = -90;
        direction = 1;
    }

    needle.style.transform = `rotate(${angle}deg)`;
    animationFrame = requestAnimationFrame(needleSwing);
}

HitButton.addEventListener("click", function () {
    if (!gameRunning) return;

    gameRunning = false;
    cancelAnimationFrame(animationFrame);
    animateHammer();

    let currScore = calculateScore(angle);
    scores[currPlayer] = currScore;

    updateScoreDisplay();
    restartButton.style.display = "block";
    HitButton.style.display = "none";
    content.style.display = "none";
    if (scores[player1] > 0 && scores[player2] > 0) {
        showWinner(); 
    }
});

function animateHammer() {
    hammer.style.transition = "transform 0.1s ease-in-out";
    hammer.style.transform = "rotate(45deg)";
    setTimeout(() => {
        hammer.style.transition = "transform 0.2s ease-out";
        hammer.style.transform = "rotate(0deg)";
    }, 100);
}

function calculateScore(angle) {
    return 100 - Math.round((100 / 90) * Math.abs(angle));
}

restartButton.addEventListener("click", function () {
    if (scores[player1] > 0 && scores[player2] > 0) {
        showWinner();
scores[player1] = 0;
            scores[player2] = 0;
            document.getElementById("winnerDisplay").innerText = ""; 
            startNextTurn(); 
    } else {
        startNextTurn(); 
    }
});


function updateScoreDisplay() {
    scoreDisplay.innerHTML = `
        ${player1} Score: ${scores[player1]}<br>
        ${player2} Score: ${scores[player2]}
    `;
}

function updatePlayerDisplay() {
    playerTurnDisplay.innerText = `${currPlayer}'s Turn`;
}

function showWinner() {
    let winner = scores[player1] === scores[player2]
        ? "It's a Tie!"
        : (scores[player1] > scores[player2] ? player1 : player2) + " Wins!";
    document.getElementById("winnerDisplay").innerText = winner;

}

function startNextTurn() {
    angle = 0;
    direction = 1;
    gameRunning = true;
    needle.style.transform = `rotate(0deg)`;
    restartButton.style.display = "none";
    HitButton.style.display = "block";
    content.style.display = "block";
    currPlayer = currPlayer === player1 ? player2 : player1;
    updatePlayerDisplay();
    needleSwing();
}


updatePlayerDisplay();
needleSwing();
