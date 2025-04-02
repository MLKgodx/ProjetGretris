function breakTetromino(direction) {
    const newCol = currentPosition.col + direction;
    let broken = false;
    
    // Créer une copie du tetromino actuel
    let newTetromino = currentTetromino.map(row => [...row]);
    
    // Vérifier chaque cellule du tetromino
    for (let i = 0; i < currentTetromino.length; i++) {
        for (let j = 0; j < currentTetromino[i].length; j++) {
            if (currentTetromino[i][j] === 1) {
                const worldCol = newCol + j;
                // Si la cellule touche un mur ou une autre pièce
                if (worldCol < 0 || worldCol >= COLS || 
                    (grid[currentPosition.row + i][worldCol] !== ' ')) {
                    newTetromino[i][j] = 0; // Supprimer cette cellule
                    broken = true;
                }
            }
        }
    }
    
    // Si des cellules ont été supprimées
    if (broken) {
        // Vérifier si au moins une ligne complète reste
        const hasCompleteLine = newTetromino.some(row => 
            row.reduce((sum, cell) => sum + cell, 0) > 0
        );
        
        if (hasCompleteLine) {
            // Si une ligne complète existe, mettre à jour le tetromino
            currentTetromino = newTetromino;
            return true;
        } else {
            // Si aucune ligne complète ne reste, ne pas casser le tetromino
            return false;
        }
    }
    return false;
}

// Modifiez également la fonction moveTetromino
function moveTetromino(direction) {
    const newCol = currentPosition.col + direction;
    if (canPlaceTetromino(currentTetromino, currentPosition.row, newCol)) {
        currentPosition.col = newCol;
    } else if (!breakTetromino(direction)) {
        // Si on ne peut pas casser le tetromino, on bloque le mouvement
        return;
    }
    displayGrid();
}