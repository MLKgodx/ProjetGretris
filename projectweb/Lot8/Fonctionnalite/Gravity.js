// Ajoutez cette nouvelle fonction après clearFullLines()
function applyGravity() {
    let moved;
    do {
        moved = false;
        // Parcourir la grille du bas vers le haut (sauf la première ligne)
        for (let row = ROWS - 1; row > 0; row--) {
            for (let col = 0; col < COLS; col++) {
                // Si une case est vide et qu'il y a une pièce au-dessus
                if (grid[row][col] === ' ' && grid[row - 1][col] === '') {
                    // Faire descendre la pièce
                    grid[row][col] = grid[row - 1][col];
                    colorGrid[row][col] = colorGrid[row - 1][col];
                    // Vider la case du dessus
                    grid[row - 1][col] = ' ';
                    colorGrid[row - 1][col] = ' ';
                    moved = true;
                }
            }
        }
    } while (moved); // Continuer tant que des pièces descendent
}

// Modifiez la fonction clearFullLines() pour inclure la gravité
function clearFullLines() {
    let linesCleared = false;
    for (let i = 0; i < ROWS; i++) {
        if (grid[i].every(cell => cell === '')) {
            grid.splice(i, 1);
            grid.unshift(Array(COLS).fill(' '));
            colorGrid.splice(i, 1);
            colorGrid.unshift(Array(COLS).fill(' '));
            score += 100;
            linesCleared = true;
        }
    }
    if (linesCleared) {
        applyGravity();
        updateScore();
    }
}