// Fonction à tester
function applyGravity(grid, colorGrid) {
    let moved;
    do {
        moved = false;
        for (let row = grid.length - 1; row > 0; row--) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === ' ' && grid[row - 1][col] === 'X') {
                    grid[row][col] = grid[row - 1][col];
                    colorGrid[row][col] = colorGrid[row - 1][col];
                    grid[row - 1][col] = ' ';
                    colorGrid[row - 1][col] = ' ';
                    moved = true;
                }
            }
        }
    } while (moved);
}

// Fonction utilitaire pour comparer les grilles
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

// Test 1: Test de base avec deux blocs
function testSimpleGravity() {
    console.log("\n=== Test 1: Gravité Simple ===");
    const initialGrid = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', ' ', 'X', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    const expectedGrid = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', ' ', 'X', ' ']
    ];
    
    let testGrid = JSON.parse(JSON.stringify(initialGrid));
    let testColorGrid = Array(4).fill().map(() => Array(5).fill(' '));
    
    applyGravity(testGrid, testColorGrid);
    console.log("Résultat:", compareGrids(testGrid, expectedGrid) ? "Succès" : "Échec");
}

// Test 2: Test avec plusieurs blocs en cascade
function testCascadeGravity() {
    console.log("\n=== Test 2: Gravité en Cascade ===");
    const initialGrid = [
        [' ', 'X', ' ', ' ', ' '],
        [' ', ' ', ' ', 'X', ' '],
        ['X', ' ', 'X', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    const expectedGrid = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        ['X', 'X', 'X', 'X', ' ']
    ];
    
    let testGrid = JSON.parse(JSON.stringify(initialGrid));
    let testColorGrid = Array(4).fill().map(() => Array(5).fill(' '));
    
    applyGravity(testGrid, testColorGrid);
    console.log("Résultat:", compareGrids(testGrid, expectedGrid) ? "Succès" : "Échec");
}

// Test 3: Test avec des blocs déjà au fond
function testBottomBlocks() {
    console.log("\n=== Test 3: Blocs au Fond ===");
    const initialGrid = [
        [' ', ' ', 'X', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', ' ', 'X', ' '],
        ['X', 'X', 'X', 'X', 'X']
    ];
    const expectedGrid = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'X', ' ', ' '],
        ['X', 'X', 'X', 'X', 'X']
    ];
    
    let testGrid = JSON.parse(JSON.stringify(initialGrid));
    let testColorGrid = Array(4).fill().map(() => Array(5).fill(' '));
    
    applyGravity(testGrid, testColorGrid);
    console.log("Résultat:", compareGrids(testGrid, expectedGrid) ? "Succès" : "Échec");
}

// Test 4: Test de conservation des couleurs
function testColorPreservation() {
    console.log("\n=== Test 4: Conservation des Couleurs ===");
    const initialGrid = [
        [' ', 'X', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ']
    ];
    const initialColorGrid = [
        [' ', 'red', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ']
    ];
    const expectedColorGrid = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', 'red', ' ', ' ']
    ];
    
    let testGrid = JSON.parse(JSON.stringify(initialGrid));
    let testColorGrid = JSON.parse(JSON.stringify(initialColorGrid));
    
    applyGravity(testGrid, testColorGrid);
    console.log("Résultat:", compareGrids(testColorGrid, expectedColorGrid) ? "Succès" : "Échec");
}

// Exécution de tous les tests
console.log("=== Début des Tests de Gravité ===");
testSimpleGravity();
testCascadeGravity();
testBottomBlocks();
testColorPreservation();
console.log("\n=== Fin des Tests de Gravité ===");