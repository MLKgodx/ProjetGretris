/**
 * The JavaScript code defines functions to initialize, modify, display, and compare a grid, along with
 * updating a timer and handling keyboard events for a game-like application.
 */


/* The code snippet `const rows = 20; const cols = 10; let grid = []; let timeElapsed = 0;` is
initializing variables used in the JavaScript code for managing a grid-based application. Here's
what each variable represents: */

const rows = 20;
const cols = 10;
let grid = [];
let timeElapsed = 0;


/**
 * The function initializes a grid with a specified number of rows and columns, filling each cell with
 * a period character.
 */
function initializeGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(' '));
}

/**
 * The function getElement retrieves an element from a grid based on the specified row and column
 * indices, throwing an error if the indices are out of bounds.
 * @param row - The `row` parameter represents the row index of the element you want to retrieve from a
 * grid or a 2D array.
 * @param col - The `col` parameter represents the column index of the element you want to retrieve
 * from a grid or a 2D array. It is used in conjunction with the `row` parameter to access a specific
 * element in the grid.
 * @returns the element at the specified row and column in the grid.
 */
function getElement(row, col) {
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        return grid[row][col];
    } else {
        throw new Error("Indices hors limites");
    }
}

/**
 * The function `setElement` updates the value of a specific element in a grid based on the provided
 * row and column indices.
 * @param row - The `row` parameter represents the row index of the element in a grid where you want to
 * set a new value.
 * @param col - The `col` parameter represents the column index in a grid where you want to set a
 * specific value.
 * @param value - The `value` parameter in the `setElement` function represents the value that you want
 * to set at the specified row and column in the grid. It is the new value that you want to assign to
 * the grid element at the given position (row, col).
 */

function setElement(row, col, value) {
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = value;
    } else {
        throw new Error("Indices hors limites");
    }
}


/**
 * The function `displayGrid` creates a grid of cells in a specified HTML element and populates each
 * cell with a value from a 2D array.
 */
function displayGrid() {
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = '';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = grid[row][col];
            gridDiv.appendChild(cell);
        }
    }
}

/**
 * The function `updateTimer` increments the `timeElapsed` variable and updates the text content of an
 * element with id 'timer' to display the elapsed time in seconds.
 */
function updateTimer() {
    timeElapsed++;
    document.getElementById('timer').textContent = `Temps écoulé : ${timeElapsed}s`;
}


/* The `document.addEventListener('keydown', ...)` code snippet is adding an event listener to the
document object for the 'keydown' event. When a key is pressed, the provided callback function is
executed. */
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        alert("Déplacer à gauche");
    } else if (e.key === "ArrowRight") {
        alert("Déplacer à droite");
    } else if (e.key === "ArrowDown") {
        alert("Descendre plus vite");
    } else if (e.key === "ArrowUp") {
        alert("Faire tourner la pièce");
    }
});


/* The `setInterval` function in the provided code snippet is used to repeatedly execute a specified
function (`() => { console.log("Actualisation de la grille"); displayGrid(); }`) at a specified
interval of time (1000 milliseconds or 1 second in this case). */
setInterval(() => {
    console.log("Actualisation de la grille");
    displayGrid();
}, 1000);


/* The line `setInterval(updateTimer, 1000);` is setting up a timer that calls the `updateTimer`
function every 1000 milliseconds (1 second). This means that the `updateTimer` function will be
executed every second, incrementing the `timeElapsed` variable and updating the displayed elapsed
time on the webpage. */
setInterval(updateTimer, 1000);

/* The `initializeGrid()` function initializes a grid with a specified number of rows and columns,
filling each cell with a period character. After that, the `displayGrid()` function creates a grid
of cells in a specified HTML element and populates each cell with a value from the 2D array that was
initialized by `initializeGrid()`. So, `initializeGrid()` sets up the grid structure, and
`displayGrid()` visually displays this grid on the webpage. */
initializeGrid();
displayGrid();