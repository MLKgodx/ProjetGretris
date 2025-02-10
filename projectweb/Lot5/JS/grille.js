/**
 * The provided JavaScript code sets up a Tetris-like game where tetrominos fall down a grid, allowing
 * the player to move and rotate them to clear lines and accumulate points.
 */

/* The code snippet you provided is initializing several variables and constants for a Tetris-like game
setup in JavaScript: */
const rows = 20;
const cols = 10;
let grid = [];
let timeElapsed = 0;
let currentTetromino = null;
let currentPosition = { row: 0, col: Math.floor(cols / 2) };

/* The `const tetrominos` array is defining the different shapes of tetrominos used in the Tetris-like
game. Each element in the array represents a different tetromino shape, where each shape is
represented by a 2D array of 1s and 0s. */
const tetrominos = [
    [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
    [[1,0,1],[0,1,0],[1,0,1]], // X
    [[0,1,0], [1,1,1], [0,1,0]] // +

];

/**
 * The function `initializeGrid` creates a 2D grid filled with empty spaces.
 */
function initializeGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(' '));
}

/**
 * The function `spawnTetromino` randomly selects a tetromino shape and its initial position on the
 * game board, checking if it can be placed, and ending the game if it cannot.
 */
function spawnTetromino() {
    currentTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    currentPosition = { row: 0, col: Math.floor(cols / 2) - Math.floor(currentTetromino[0].length / 2) };

    if (!canPlaceTetromino(currentTetromino, currentPosition.row, currentPosition.col)) {
        alert("Game Over!");
        clearInterval(gameInterval);
        clearInterval(timerInterval);
    }
}

/**
 * The function `canPlaceTetromino` checks if a tetromino can be placed at a specified position on a
 * grid without overlapping or going out of bounds.
 * @param tetromino - The `tetromino` parameter represents a shape in the form of a 2D array where 1s
 * represent the blocks of the shape and 0s represent empty spaces.
 * @param row - The `row` parameter in the `canPlaceTetromino` function represents the starting row
 * position where the tetromino will be placed on a grid or game board. It is used to calculate the
 * actual row position of each cell within the tetromino shape when checking if it can be
 * @param col - The `col` parameter in the `canPlaceTetromino` function represents the column index
 * where the top-left corner of the tetromino will be placed on the grid.
 * @returns The function `canPlaceTetromino` is returning a boolean value. It returns `true` if the
 * tetromino can be placed at the specified row and column on the grid without overlapping with
 * existing filled cells or going out of bounds. It returns `false` if the tetromino cannot be placed
 * at the specified position.
 */
function canPlaceTetromino(tetromino, row, col) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j] === 1) {
                if (
                    row + i >= rows ||
                    col + j < 0 ||
                    col + j >= cols ||
                    (row + i >= 0 && grid[row + i][col + j] !== ' ')
                ) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * The function `placeTetromino` is used to position a tetromino shape on a grid by updating the grid
 * cells based on the provided row and column coordinates.
 * @param tetromino - It seems like you were about to provide more information about the `tetromino`
 * parameter but the message got cut off. Could you please provide more details about the `tetromino`
 * parameter so that I can assist you further with the `placeTetromino` function?
 * @param row - The `row` parameter in the `placeTetromino` function represents the starting row
 * position where the tetromino will be placed on the grid. It determines the vertical position of the
 * tetromino within the grid.
 * @param col - The `col` parameter in the `placeTetromino` function represents the column index where
 * the tetromino will be placed within the grid. It determines the horizontal position of the tetromino
 * within the grid.
 */
function placeTetromino(tetromino, row, col) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j] === 1 && row + i >= 0) {
                grid[row + i][col + j] = '';
            }
        }
    }
}

/**
 * The function `clearFullLines` removes any full lines in a grid by shifting all lines above them
 * down.
 */
function clearFullLines() {
    for (let i = 0; i < rows; i++) {
        if (grid[i].every(cell => cell === '')) {
            grid.splice(i, 1);
            grid.unshift(Array(cols).fill(' '));
        }
    }
}

/**
 * The function `moveTetrominoDown` moves a tetromino down if possible, otherwise it places the
 * tetromino, clears full lines, and spawns a new tetromino.
 */
function moveTetrominoDown() {
    if (canPlaceTetromino(currentTetromino, currentPosition.row + 1, currentPosition.col)) {
        currentPosition.row++;
    } else {
        placeTetromino(currentTetromino, currentPosition.row, currentPosition.col);
        clearFullLines();
        spawnTetromino();
    }
}

/**
 * The function `moveTetromino` moves a tetromino in a specified direction if it can be placed in the
 * new position.
 * @param direction - The `direction` parameter in the `moveTetromino` function represents the
 * direction in which the tetromino should move horizontally. A positive value indicates moving to the
 * right, while a negative value indicates moving to the left.
 */
function moveTetromino(direction) {
    const newCol = currentPosition.col + direction;
    if (canPlaceTetromino(currentTetromino, currentPosition.row, newCol)) {
        currentPosition.col = newCol;
    }
}

/**
 * The function `rotateTetromino` rotates the current tetromino shape if it can be placed in the new
 * rotated position.
 */
function rotateTetromino() {
    const rotated = currentTetromino[0].map((_, index) => currentTetromino.map(row => row[index]).reverse());
    if (canPlaceTetromino(rotated, currentPosition.row, currentPosition.col)) {
        currentTetromino = rotated;
    }
}

/**
 * The function `displayGrid` updates and displays a grid with a current tetromino positioned on it.
 */
function displayGrid() {
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = '';
    const tempGrid = grid.map(row => [...row]);

    /* The code snippet you provided is part of the `displayGrid` function in the Tetris-like game setup.
    This specific portion of the code is responsible for drawing the current tetromino on a temporary
    copy of the grid before displaying the updated grid. */
    for (let i = 0; i < currentTetromino.length; i++) {
        for (let j = 0; j < currentTetromino[i].length; j++) {
            if (currentTetromino[i][j] === 1 && currentPosition.row + i >= 0) {
                tempGrid[currentPosition.row + i][currentPosition.col + j] = '';
            }
        }
    }


    /* The provided code snippet is a nested loop that iterates over each cell in the grid (represented by
    `tempGrid`) to create a visual representation of the game grid in the HTML document. Here's a
    breakdown of what the code is doing: */
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (tempGrid[row][col] != '') cell.className = "libre";
            else cell.className = "occupé";
            cell.textContent = tempGrid[row][col];
            gridDiv.appendChild(cell);
        }
    }
}

/**
 * The function `updateTimer` increments a time counter and updates a timer display with the elapsed
 * time in minutes and seconds.
 */
function updateTimer() {
    timeElapsed++;

    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    const timerDiv = document.getElementById('timer');
    timerDiv.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


/* The `document.addEventListener('keydown', ...)` code snippet is setting up an event listener for
keydown events on the document object. When a key is pressed, the provided arrow key conditions
check which arrow key was pressed: */
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        moveTetromino(-1);
    } else if (e.key === "ArrowRight") {
        moveTetromino(1);
    } else if (e.key === "ArrowDown") {
        moveTetrominoDown();
    } else if (e.key === "ArrowUp") {
        rotateTetromino();
    }
    displayGrid();
});

/* The code snippet `initializeGrid(); spawnTetromino(); displayGrid();` is performing the following
actions: */
initializeGrid();
spawnTetromino();
displayGrid();

/* The code snippet you provided is setting up two intervals using `setInterval` in JavaScript. */
const gameInterval = setInterval(() => {
    moveTetrominoDown();
    displayGrid();
}, 1000);

/* The line `const timerInterval = setInterval(updateTimer, 1000);` in the provided JavaScript code
snippet is setting up an interval using the `setInterval` function. */
const timerInterval = setInterval(updateTimer, 1000);
