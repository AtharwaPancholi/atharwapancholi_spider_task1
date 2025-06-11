// Define player names
let playerRed = "Red";
let playerYellow = "Yellow";
let currPlayer = playerRed; // Start with Red player
let gameOver = false; // Game status
let board; // The game board (2D array)
let rows = 6; // Number of rows
let columns = 7; // Number of columns
let currColumns = []; // Array tracking the lowest empty row in each column
let blockedColumn = -1; // Currently blocked column
let waitingForBlock = true; // Whether we are waiting for the other player to block a column
let redTimeLeft = 120; // Red player's time
let yellowTimeLeft = 120; // Yellow player's time
let redTimer; // Interval timer for Red
let yellowTimer; // Interval timer for Yellow
let redWins = 0; // Total wins for Red
let yellowWins = 0; // Total wins for Yellow

// Power-up availability for each player
let powerUps = {
    [playerRed]: {
        addTime: 2, // Red can add time 2 times
        blockImmunity: 2 // Red can bypass block 2 times
    },
    [playerYellow]: {
        addTime: 2, // Same for Yellow
        blockImmunity: 2
    }
};

let useBlockImmunity = false; // Whether current player is using block immunity
let soundEnabled = true; // Whether sounds are enabled

// Load sound effects
const dropSound = new Audio("Sounds/DiscDrop Sound.wav");
const winSound = new Audio("Sounds/Victory Sound.mp3");
const powerupSound = new Audio("Sounds/PowerupSound.mp3");

// When page loads, initialize everything
window.onload = function () {
    setGame(); // Set up game board
    startTimer(); // Start timer for current player
    updateTurnMessage(); // Show message for turn
    setupBlockButtons(); // Setup click listeners for block buttons
    loadLeaderboard(); // Load scores from storage
    setUpPowerUpButtons(); // Attach power-up button listeners
    setupSoundToggle(); // Allow sound toggle
    setupThemeToggle(); // Allow theme switching
}

// Create game board and assign event listeners
function setGame() {
    board = [];
    currColumns = Array(columns).fill(rows - 1); // Set all columns to bottom row initially
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; // Clear board UI

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' '); // Initialize board space as empty
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`; // Set id for identifying
            tile.classList.add("tile"); // Add class for styling
            tile.addEventListener("click", setPiece); // On click, place piece
            boardDiv.append(tile); // Add to board
        }
        board.push(row); // Add row to board
    }
}

// Set up the block column buttons
function setupBlockButtons() {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (waitingForBlock && !gameOver) {
                blockedColumn = index; // Store blocked column
                waitingForBlock = false; // Done waiting
                updateBlockedButtons(); // Update UI
                updateTurnMessage(); // Show message
            }
        });
    });
}

// Update block button visuals and interactivity
function updateBlockedButtons() {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach((btn, index) => {
        if (waitingForBlock) {
            btn.disabled = false; // All enabled
            btn.style.backgroundColor = "";
        } else {
            btn.disabled = true; // All disabled
            btn.style.backgroundColor = (index === blockedColumn) ? "gray" : "";
        }
    });
}

// Show which player's turn or block status
function updateTurnMessage() {
    const winner = document.getElementById("waitingForBlock");
    if (gameOver) return;

    if (waitingForBlock) {
        let blocker = currPlayer === playerRed ? "Yellow" : "Red"; // Other player blocks
        winner.innerText = `${blocker}, choose a column to block`;
        stopTimer(); // Pause timer
        document.getElementById("timer").innerText = `Waiting to block....`;
    } else {
        winner.innerText = `${currPlayer === playerRed ? "Red" : "Yellow"}'s turn! (Cannot play in Column ${blockedColumn + 1})`;
        startTimer(); // Resume timer
    }
}

// When a tile is clicked to place a piece
function setPiece() {
    if (gameOver || waitingForBlock) return; // If game over or blocking, ignore

    let coords = this.id.split("-"); // Get row-col from id
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (c === blockedColumn && !useBlockImmunity) {return;} // If blocked column and no immunity

    r = currColumns[c]; // Get available row
    if (r < 0) return; // Column is full

    board[r][c] = currPlayer; // Set board cell
    let tile = document.getElementById(`${r}-${c}`);
    tile.classList.add(currPlayer === playerRed ? "redPiece" : "yellowPiece"); // Color tile

    currColumns[c]--; // Decrease column level
    useBlockImmunity = false; // Reset immunity flag

    checkWinner(); // Check for win
    stopTimer(); // Stop timer
    playSound(dropSound); // Play drop sound

    currPlayer = (currPlayer === playerRed) ? playerYellow : playerRed; // Switch player
    waitingForBlock = true; // Wait for block next
    blockedColumn = -1; // Reset blocked column

    updateBlockedButtons(); // Update button UI
    updateTurnMessage(); // Show turn message
}

// Check if any player has won
function checkWinner() {
    // Horizontal check
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' &&
                board[r][c] === board[r][c + 1] &&
                board[r][c + 1] === board[r][c + 2] &&
                board[r][c + 2] === board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
    // Vertical check
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ' &&
                board[r][c] === board[r + 1][c] &&
                board[r + 1][c] === board[r + 2][c] &&
                board[r + 2][c] === board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }
    // Diagonal (bottom-left to top-right)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' &&
                board[r][c] === board[r + 1][c + 1] &&
                board[r + 1][c + 1] === board[r + 2][c + 2] &&
                board[r + 2][c + 2] === board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
    // Diagonal (top-left to bottom-right)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' &&
                board[r][c] === board[r - 1][c + 1] &&
                board[r - 1][c + 1] === board[r - 2][c + 2] &&
                board[r - 2][c + 2] === board[r - 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
    // Check draw
    if(draw()){
        showDrawMessage();
    }
}

// When a player wins
function setWinner(r, c) {
    playSound(winSound); // Victory sound
    let winner = document.getElementById("winner");
    winner.innerText = (board[r][c] === playerRed ? "Red" : "Yellow") + " Wins!";
    gameOver = true;
    updateBlockedButtons(); // Disable buttons
    updateScore(board[r][c]); // Update score
}

// Check if board is full
function draw(){
    for(let i=0; i<currColumns.length; i++)
    {
        if(currColumns[i] >= 0){
            return false;
        }
    }
    return true;
}

// If draw, show message
function showDrawMessage(){
    let winner = document.getElementById("winner");
    winner.innerText = "It is a draw!";
    gameOver = true;
    updateBlockedButtons();
}

// Timer logic for countdown
function startTimer() {
    clearInterval(redTimer);
    clearInterval(yellowTimer);

    if (currPlayer === playerRed) {
        redTimer = setInterval(() => {
            redTimeLeft--;
            updateTimerDisplay();
            if (redTimeLeft <= 0) {
                clearInterval(redTimer);
                handleTimeout(playerRed);
            }
        }, 1000);
    } else {
        yellowTimer = setInterval(() => {
            yellowTimeLeft--;
            updateTimerDisplay();
            if (yellowTimeLeft <= 0) {
                clearInterval(yellowTimer);
                handleTimeout(playerYellow);
            }
        }, 1000);
    }
}

// Stop both timers
function stopTimer() {
    clearInterval(redTimer);
    clearInterval(yellowTimer);
}

// Show timer values
function updateTimerDisplay() {
    document.getElementById("timer").innerText = `Red: ${redTimeLeft} | Yellow: ${yellowTimeLeft}`;
}

// What happens when time runs out
function handleTimeout(player) {
    gameOver = true;
    let winner = player === playerRed ? "Yellow" : "Red";
    document.getElementById("winner").innerText = `${player} ran out of time. ${winner} wins!`;
    updateScore(winner === "Red" ? playerRed : playerYellow);
    updateBlockedButtons();
}

// Load wins from local storage
function loadLeaderboard()
{
    redWins = parseInt(localStorage.getItem("redWins")) || 0;
    yellowWins = parseInt(localStorage.getItem("yellowWins")) || 0;
    updateLeaderBoardDisplay();
}

// Display win count
function updateLeaderBoardDisplay()
{
    document.getElementById("redScore").innerText = redWins;
    document.getElementById("yellowScore").innerText = yellowWins;
}

// Update and store win count
function updateScore(winnerColor){
    if(winnerColor == playerRed)
    {
        redWins++;
        localStorage.setItem("redWins", redWins);
    }
    else{
        yellowWins++;
        localStorage.setItem("yellowWins", yellowWins);
    }
    updateLeaderBoardDisplay();
}

// Clear scores
function resetLeaderboard() {
    localStorage.removeItem("redWins");
    localStorage.removeItem("yellowWins");
    redWins = 0;
    yellowWins = 0;
    updateLeaderBoardDisplay();
}

// Use Add Time power-up
function useAddTime(){
    if(gameOver || waitingForBlock){
        return;
    }

    const statusMessage = document.getElementById("statusMessage");

    if(powerUps[currPlayer].addTime > 0){
        if(currPlayer === playerRed)
        {
            redTimeLeft += 5;
        }
        else{
            yellowTimeLeft += 5;
        }
    powerUps[currPlayer].addTime--;
    updateTimerDisplay();
    statusMessage.innerText = `${currPlayer} added 5 seconds! Remaining uses: ${powerUps[currPlayer].addTime}`;
    statusMessage.style.display = "block";
    setTimeout(() => {
        statusMessage.style.display = "none";
    }, 3000); }
    else{
        statusMessage.innerText = "No add time power-ups left";
        statusMessage.style.display = "block";
        setTimeout(()=>{
            statusMessage.style.display = "none";
        }, 3000);
    }
     playSound(powerupSound);
}

// Use Block Immunity power-up
function usedBlockImmunity()
{
    if(gameOver || waitingForBlock){
        return;
    }
    const statusMessage = document.getElementById("statusMessage");

    if(powerUps[currPlayer].blockImmunity > 0){
        useBlockImmunity = true;
        powerUps[currPlayer].blockImmunity--;
        statusMessage.innerText = `${currPlayer} used Block Immunity! You can now play in the blocked column. Remaining uses: ${powerUps[currPlayer].blockImmunity}`;
        statusMessage.style.display = "block";
        setTimeout(()=>{
            statusMessage.style.display = "none";
        }, 3000);
    }
    else{
        statusMessage.innerText = "No Block Immunity power-ups left!";
        statusMessage.style.display = "block";
        setTimeout(()=>{
            statusMessage.style.display = "none";
        }, 3000);
    }
    playSound(powerupSound);
}

// Attach listeners to power-up buttons
function setUpPowerUpButtons()
{
    document.getElementById("addTimeBtn").addEventListener("click", useAddTime);
    document.getElementById("blockImmunityBtn").addEventListener("click", usedBlockImmunity);
}

// Play sound effect if enabled
function playSound(sound)
{
    if(soundEnabled){
        sound.currentTime = 0;
        sound.play();
    }
}

// Setup toggle for sound effects
function setupSoundToggle()
{
    const toggle = document.getElementById("soundToggle");
    soundEnabled = toggle.checked;

    toggle.addEventListener("change", ()=>{
        soundEnabled = toggle.checked;
    });
}

// Setup light/dark mode toggle
function setupThemeToggle()
{
    const toggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(`${savedTheme}-mode`);
    toggle.checked = savedTheme === "dark";

    toggle.addEventListener("change", ()=>{
        const newTheme = toggle.checked ? "dark" : "light";
        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(`${newTheme}-mode`);
        localStorage.setItem("theme", newTheme);
    });
}