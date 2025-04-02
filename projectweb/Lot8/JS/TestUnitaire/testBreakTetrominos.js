// Fonction à tester (version simplifiée pour les tests)
function breakTetromino(tetromino, direction, col, grid) {
    const newCol = col + direction;
    let broken = false;
    let newTetromino = tetromino.map(row => [...row]);
    
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j] === 1) {
                const worldCol = newCol + j;
                if (worldCol < 0 || worldCol >= grid[0].length || grid[i][worldCol] !== ' ') {
                    newTetromino[i][j] = 0;
                    broken = true;
                }
            }
        }
    }
    
    if (broken) {
        const hasCompleteLine = newTetromino.some(row => 
            row.reduce((sum, cell) => sum + cell, 0) > 0
        );
        return hasCompleteLine ? newTetromino : tetromino;
    }
    return tetromino;
}

// Fonction utilitaire pour comparer les tetrominos
function compareTetrominos(tetro1, tetro2) {
    if (tetro1.length !== tetro2.length) return false;
    return tetro1.every((row, i) => 
        row.every((cell, j) => cell === tetro2[i][j])
    );
}

// Test 1: Collision avec le mur gauche
function testLeftWallCollision() {
    console.log("\n=== Test 1: Collision Mur Gauche ===");
    const initialTetromino = [
        [1, 1],
        [1, 0]
    ];
    const expectedTetromino = [
        [0, 1],
        [0, 0]
    ];
    const grid = [
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    
    const result = breakTetromino(initialTetromino, -1, 0, grid);
    console.log("Initial:", initialTetromino);
    console.log("Résultat:", result);
    console.log("Attendu:", expectedTetromino);
    console.log("Test:", compareTetrominos(result, expectedTetromino) ? "Succès" : "Échec");
}

// Test 2: Collision avec le mur droit
function testRightWallCollision() {
    console.log("\n=== Test 2: Collision Mur Droit ===");
    const initialTetromino = [
        [1, 1],
        [0, 1]
    ];
    const expectedTetromino = [
        [1, 0],
        [0, 0]
    ];
    const grid = [
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    
    const result = breakTetromino(initialTetromino, 1, 1, grid);
    console.log("Initial:", initialTetromino);
    console.log("Résultat:", result);
    console.log("Attendu:", expectedTetromino);
    console.log("Test:", compareTetrominos(result, expectedTetromino) ? "Succès" : "Échec");
}

// Test 3: Collision avec une pièce existante
function testPieceCollision() {
    console.log("\n=== Test 3: Collision avec Pièce ===");
    const initialTetromino = [
        [1, 1],
        [1, 1]
    ];
    const grid = [
        [' ', 'X', ' '],
        [' ', ' ', ' ']
    ];
    const expectedTetromino = [
        [1, 0],
        [1, 1]
    ];
    
    const result = breakTetromino(initialTetromino, 1, 0, grid);
    console.log("Initial:", initialTetromino);
    console.log("Résultat:", result);
    console.log("Attendu:", expectedTetromino);
    console.log("Test:", compareTetrominos(result, expectedTetromino) ? "Succès" : "Échec");
}

// Test 4: Pas de cassure si ligne vide
function testNoBreakEmptyLine() {
    console.log("\n=== Test 4: Pas de Cassure si Ligne Vide ===");
    const initialTetromino = [
        [1, 0],
        [0, 0]
    ];
    const grid = [
        [' ', 'X'],
        [' ', ' ']
    ];
    
    const result = breakTetromino(initialTetromino, 1, 0, grid);
    console.log("Initial:", initialTetromino);
    console.log("Résultat:", result);
    console.log("Attendu: Identique à l'initial");
    console.log("Test:", compareTetrominos(result, initialTetromino) ? "Succès" : "Échec");
}

// Exécution des tests
console.log("=== Début des Tests de Break ===");
testLeftWallCollision();
testRightWallCollision();
testPieceCollision();
testNoBreakEmptyLine();
console.log("\n=== Fin des Tests de Break ===");