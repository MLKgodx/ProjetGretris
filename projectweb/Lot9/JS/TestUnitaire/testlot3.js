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

function testCompareGrids() {
    // Grille de référence
    const grid1 = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', ' ', 'X', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', 'X', ' ', ' ']
    ];

    // Cas 1 : Grille identique (devrait retourner true)
    const grid2 = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', ' ', 'X', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', 'X', ' ', ' ']
    ];

    // Cas 2 : Grille différente (devrait retourner false)
    const grid3 = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'X', 'X', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', 'X', 'X', ' ', ' ']
    ];

    console.log("Test 1 grilles identiques entre grille 1 et 2 : " + (compareGrids(grid1, grid2) === true ? "Succès" : "Échec"));
    console.log("Test 2 grilles différentes entre grille 1 et 3 : " + (compareGrids(grid1, grid3) === false ? "Succès" : "Échec"));
}

// Appel de la fonction de test
testCompareGrids();