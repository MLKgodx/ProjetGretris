/**
 * Tetris Game Implementation
 */

// =================== CONSTANTES & VARIABLES GLOBALES ===================
const ROWS = 20;
const COLS = 10;
const COLORS = ['#00FFFF', '#FFFF00', '#800080', '#FFA500', '#0000FF', '#00FF00', '#FF0000'];
const TETROMINOS = [
    [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 0, 1], [0, 1, 0], [1, 0, 1]], // X
    [[0, 1, 0], [1, 1, 1], [0, 1, 0]] // +
];

let grid = [];
let colorGrid = [];
let timeElapsed = 0;
let currentTetromino = null;
let currentPosition = { row: 0, col: Math.floor(COLS / 2) };
let score = 0;
let currentColor = '';
let gameInterval;
let timerInterval;

// =================== INITIALISATION ===================
function initializeGame() {
    initializeGrid();
    spawnTetromino();
    displayGrid();
    updateScore();
    startGameLoop();
}

function initializeGrid() {
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));
    colorGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));
}

function spawnTetromino() {
    currentTetromino = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
    currentPosition = { 
        row: 0, 
        col: Math.floor(COLS / 2) - Math.floor(currentTetromino[0].length / 2) 
    };
    currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    if (!canPlaceTetromino(currentTetromino, currentPosition.row, currentPosition.col)) {
        endGame();
    }
}

// =================== LOGIQUE DU JEU ===================
function moveTetrominoDown() {
    if (canPlaceTetromino(currentTetromino, currentPosition.row + 1, currentPosition.col)) {
        currentPosition.row++;
    } else {
        placeTetromino(currentTetromino, currentPosition.row, currentPosition.col);
        clearFullLines();
        spawnTetromino();
    }
}

function moveTetromino(direction) {
    const newCol = currentPosition.col + direction;
    if (canPlaceTetromino(currentTetromino, currentPosition.row, newCol)) {
        currentPosition.col = newCol;
    }
}

function rotateTetromino() {
    const rotated = currentTetromino[0].map((_, index) => 
        currentTetromino.map(row => row[index]).reverse()
    );
    if (canPlaceTetromino(rotated, currentPosition.row, currentPosition.col)) {
        currentTetromino = rotated;
    }
}

function canPlaceTetromino(tetromino, row, col) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j] === 1) {
                if (
                    row + i >= ROWS ||
                    col + j < 0 ||
                    col + j >= COLS ||
                    (row + i >= 0 && grid[row + i][col + j] !== ' ')
                ) {
                    return false;
                }
            }
        }
    }
    return true;
}

function placeTetromino(tetromino, row, col) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j] === 1 && row + i >= 0) {
                grid[row + i][col + j] = '';
                colorGrid[row + i][col + j] = currentColor;
            }
        }
    }
}

function clearFullLines() {
    for (let i = 0; i < ROWS; i++) {
        if (grid[i].every(cell => cell === '')) {
            grid.splice(i, 1);
            grid.unshift(Array(COLS).fill(' '));
            score += 100;
        }
    }
    updateScore();
}

function getShadowPosition() {
    let shadowRow = currentPosition.row;
    while (canPlaceTetromino(currentTetromino, shadowRow + 1, currentPosition.col)) {
        shadowRow++;
    }
    return { row: shadowRow, col: currentPosition.col };
}

// =================== AFFICHAGE ===================
function displayGrid() {
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = '';
    const tempGrid = grid.map(row => [...row]);
    const shadowPosition = getShadowPosition();

    // Afficher l'ombre
    for (let i = 0; i < currentTetromino.length; i++) {
        for (let j = 0; j < currentTetromino[i].length; j++) {
            if (currentTetromino[i][j] === 1 && shadowPosition.row + i >= 0) {
                tempGrid[shadowPosition.row + i][shadowPosition.col + j] = 'X';
            }
        }
    }

    // Afficher le tetromino actuel
    for (let i = 0; i < currentTetromino.length; i++) {
        for (let j = 0; j < currentTetromino[i].length; j++) {
            if (currentTetromino[i][j] === 1 && currentPosition.row + i >= 0) {
                tempGrid[currentPosition.row + i][currentPosition.col + j] = 'T';
            }
        }
    }

    // Rendu de la grille
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (tempGrid[row][col] === 'X') {
                cell.className = "shadow";
            } else if (tempGrid[row][col] === 'T') {
                cell.style.background = currentColor;
                cell.className = "tetromino";
            } else if (tempGrid[row][col] === '') {
                cell.style.backgroundColor = colorGrid[row][col];
                cell.className = "placé";
            } else {
                cell.className = "libre";
            }

            gridDiv.appendChild(cell);
        }
    }
}

function updateScore() {
    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = `Score: ${score}`;
}

function updateTimer() {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timerDiv = document.getElementById('timer');
    timerDiv.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// =================== CONTRÔLES & BOUCLE DE JEU ===================
function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowLeft':
            moveTetromino(-1);
            break;
        case 'ArrowRight':
            moveTetromino(1);
            break;
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowUp':
            rotateTetromino();
            break;
    }
    displayGrid();
}

function startGameLoop() {
    gameInterval = setInterval(() => {
        moveTetrominoDown();
        displayGrid();
    }, 1000);
    
    timerInterval = setInterval(updateTimer, 1000);
    document.addEventListener('keydown', handleKeyPress);
}

function endGame() {
    alert("Perdu ! Vous pouvez réessayer en appuyant sur 'Rejouer'.");
    clearInterval(gameInterval);
    clearInterval(timerInterval);
}

// Démarrage du jeu
initializeGame();