// Fonction pour comparer deux grilles
function compareGrids(grid1, grid2) {
    if (grid1.length !== grid2.length || grid1[0].length !== grid2[0].length) {
        return false;
    }
    for (let row = 0; row < grid1.length; row++) {
        for (let col = 0; col < grid1[row].length; col++) {
            if (grid1[row][col] !== grid2[row][col]) {
                return false;
            }
        }
    }
    return true;
}

// Fonction pour déplacer un Tétromino
function moveTetromino(grid, tetromino, direction) {
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Directions possibles
    const offsets = {
        left: [0, -1],
        right: [0, 1],
        down: [1, 0]
    };

    const [rowOffset, colOffset] = offsets[direction];

    // Copier la grille pour ne pas modifier l'originale
    const newGrid = grid.map(row => row.slice());

    // Effacer la position actuelle du Tétromino
    for (let [row, col] of tetromino) {
        newGrid[row][col] = ' ';
    }

    // Calculer la nouvelle position
    const newTetromino = [];
    for (let [row, col] of tetromino) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;

        // Vérifier les limites et les collisions
        if (
            newRow < 0 || newRow >= numRows ||
            newCol < 0 || newCol >= numCols ||
            grid[newRow][newCol] === 'X'
        ) {
            return grid; // Retourner la grille inchangée si le mouvement est invalide
        }

        newTetromino.push([newRow, newCol]);
    }

    // Mettre à jour la nouvelle position dans la grille
    for (let [row, col] of newTetromino) {
        newGrid[row][col] = 'T';
    }

    return newGrid;
}

// Fonction pour afficher une grille
function displayGrid(grid) {
    for (const row of grid) {
        console.log(row.join(''));
    }
    console.log('\n');
}

// Fonction de test pour les mouvements des Tétrominos
function testMoveTetromino() {
    // Grille de test initiale
    const grid = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'T', 'T', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];

    // Position initiale du Tétromino
    const tetromino = [
        [2, 1], [2, 2]
    ];

    console.log("Grille initiale :");
    displayGrid(grid);

    // Déplacement à droiteF
    const expectedGridRight = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'T', 'T', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];

    const resultRight = moveTetromino(grid, tetromino, 'right');
    console.log("Test déplacement à droite : " + (compareGrids(resultRight, expectedGridRight) ? "Succès" : "Échec"));
    displayGrid(resultRight);

    // Déplacement invalide (gauche, hors limites)
    const expectedGridInvalid = grid;
    const resultLeft = moveTetromino(grid, tetromino, 'left');
    console.log("Test déplacement invalide (gauche) : " + (compareGrids(resultLeft, expectedGridInvalid) ? "Succès" : "Échec"));
    displayGrid(resultLeft);

    // Déplacement vers le bas
    const expectedGridDown = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'T', 'T', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];

    const resultDown = moveTetromino(grid, tetromino, 'down');
    console.log("Test déplacement vers le bas : " + (compareGrids(resultDown, expectedGridDown) ? "Succès" : "Échec"));
    displayGrid(resultDown);
}

// Appel de la fonction de test
testMoveTetromino();
