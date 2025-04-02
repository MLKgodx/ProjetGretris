/**
 * @file tetrominos.js
 * @description Gestion des tetrominos (création, déplacement, rotation)
 */

import { GRID_CONFIG, TETROMINOS, COLORS, TETROMINO_TYPES } from './config.js';
import { gameState, timers } from './game-state.js';
import { displayGrid } from './renderer.js';
import { clearFullLines } from './grid.js';
import { startGameLoop } from './game-loop.js';
import { endGame } from './end-game.js';
import { addBreakingEffects } from './effects.js';

/**
 * Génère un nouveau tetromino aléatoire et le place en haut de la grille
 * @returns {boolean} Faux si le placement est impossible (game over), vrai sinon
 */
export function spawnTetromino() {
    // Sélectionner un tetromino aléatoire et sa couleur
    const tetrominoIndex = Math.floor(Math.random() * TETROMINOS.length);
    gameState.currentTetromino = TETROMINOS[tetrominoIndex];
    gameState.currentColor = COLORS[tetrominoIndex % COLORS.length];
    gameState.currentTetrominoType = TETROMINO_TYPES[tetrominoIndex];

    // Position initiale centrée
    gameState.currentPosition = {
        row: -Math.floor(gameState.currentTetromino.length / 2), // Commence plus haut pour une apparition progressive
        col: Math.floor(GRID_CONFIG.COLS / 2) - Math.floor(gameState.currentTetromino[0].length / 2)
    };

    // Vérifier si le placement est possible
    if (!canPlaceTetromino(gameState.currentTetromino, gameState.currentPosition.row, gameState.currentPosition.col)) {
        endGame();
        return false;
    }

    // Incrémenter le compteur de pièces
    gameState.piecesDropped++;
    return true;
}

/**
 * Déplace le tetromino actuel d'une case vers le bas
 * Si le mouvement est impossible, place le tetromino et en génère un nouveau
 */
export function moveTetrominoDown() {
    if (canPlaceTetromino(gameState.currentTetromino, gameState.currentPosition.row + 1, gameState.currentPosition.col)) {
        gameState.currentPosition.row++;
    } else {
        placeTetromino(gameState.currentTetromino, gameState.currentPosition.row, gameState.currentPosition.col);
        clearFullLines();
        spawnTetromino();
    }
}

/**
 * Essaie de déplacer le tetromino horizontalement
 * Si impossible, essaie de le casser partiellement contre l'obstacle
 * @param {number} direction Direction du mouvement (-1 = gauche, 1 = droite)
 * @returns {boolean} Vrai si le mouvement ou la cassure a réussi
 */
export function moveTetromino(direction) {
    const newCol = gameState.currentPosition.col + direction;

    // Vérifier si le mouvement est possible
    if (canPlaceTetromino(gameState.currentTetromino, gameState.currentPosition.row, newCol)) {
        gameState.currentPosition.col = newCol;
        displayGrid();
        return true;
    }

    // Si le mouvement n'est pas possible, essayer de casser le tetromino
    const result = breakTetromino(direction);
    if (result) {
        console.log("Tetromino partiellement cassé");
        return true;
    } else {
        console.log("Mouvement bloqué");
        return false;
    }
}

/**
 * Tente de faire tourner le tetromino actuel
 * La rotation est annulée si elle provoquerait une collision
 */
export function rotateTetromino() {
    const rotated = gameState.currentTetromino[0].map((_, index) =>
        gameState.currentTetromino.map(row => row[index]).reverse()
    );
    
    if (canPlaceTetromino(rotated, gameState.currentPosition.row, gameState.currentPosition.col)) {
        gameState.currentTetromino = rotated;
    }
}

/**
 * Casse partiellement un tetromino lors d'une collision avec un obstacle
 * Réduit la durabilité des cellules qui entrent en collision
 * @param {number} direction Direction du mouvement (-1 = gauche, 1 = droite)
 * @returns {boolean} Vrai si le tetromino a été modifié
 */
export function breakTetromino(direction) {
    const newCol = gameState.currentPosition.col + direction;
    let broken = false;

    // Créer une copie profonde du tetromino actuel
    let newTetromino = JSON.parse(JSON.stringify(gameState.currentTetromino));

    for (let i = 0; i < gameState.currentTetromino.length; i++) {
        for (let j = 0; j < gameState.currentTetromino[i].length; j++) {
            if (gameState.currentTetromino[i][j].value === 1) {
                const worldCol = newCol + j;
                const worldRow = gameState.currentPosition.row + i;

                // Vérifier la collision avec les murs ou d'autres pièces
                if (worldCol < 0 || worldCol >= GRID_CONFIG.COLS ||
                    (worldRow >= 0 && gameState.grid[worldRow][worldCol] !== ' ')) {

                    // Réduire la durabilité de la cellule existante
                    newTetromino[i][j].durability--;
                    console.log(`Position (${i},${j}) - Durabilité réduite à: ${newTetromino[i][j].durability}`);

                    // Si la durabilité atteint 0, marquer comme cassé et ajouter les effets visuels
                    if (newTetromino[i][j].durability <= 0) {
                        newTetromino[i][j].value = 0;
                        broken = true;

                        // Ajouter les effets visuels de cassure
                        addBreakingEffects(worldRow, worldCol);
                    }
                }
            }
        }
    }

    // Vérifier les modifications de manière sécurisée
    const hasChanges = newTetromino.some((row, rowIndex) =>
        row.some((cell, colIndex) => {
            const originalCell = gameState.currentTetromino[rowIndex][colIndex];
            return cell.durability !== originalCell.durability || cell.value !== originalCell.value;
        })
    );

    if (hasChanges) {
        // Vérifier s'il reste des cellules actives
        const hasRemainingCells = newTetromino.some(row =>
            row.some(cell => cell.value === 1)
        );

        if (hasRemainingCells) {
            gameState.currentTetromino = newTetromino;
            gameState.breakCount++; // Incrémenter le compteur de cassures
            // Redémarrer la boucle de jeu avec la nouvelle vitesse
            clearInterval(timers.gameInterval);
            startGameLoop();
            displayGrid();
            return true;
        } else {
            spawnTetromino();
            return true;
        }
    }

    return false;
}

/**
 * Vérifie si le tetromino peut être placé à la position spécifiée
 * @param {Array} tetromino Forme du tetromino à vérifier
 * @param {number} row Rangée cible
 * @param {number} col Colonne cible
 * @returns {boolean} Vrai si le placement est possible
 */
export function canPlaceTetromino(tetromino, row, col) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j].value === 1) {
                if (
                    row + i >= GRID_CONFIG.ROWS ||
                    col + j < 0 ||
                    col + j >= GRID_CONFIG.COLS ||
                    (row + i >= 0 && gameState.grid[row + i][col + j] !== ' ')
                ) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Place définitivement le tetromino dans la grille
 * @param {Array} tetromino Forme du tetromino à placer
 * @param {number} row Rangée où placer le tetromino
 * @param {number} col Colonne où placer le tetromino
 */
export function placeTetromino(tetromino, row, col) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j].value === 1 && row + i >= 0) {
                // Stocker le type de tetromino dans la grille
                gameState.grid[row + i][col + j] = {
                    type: 'placed',
                    tetrominoType: gameState.currentTetrominoType
                };
            }
        }
    }
    displayGrid();
}

/**
 * Calcule la position de l'ombre du tetromino actuel
 * (position où le tetromino atterrirait s'il tombait directement)
 * @returns {Object|null} Coordonnées de l'ombre ou null si pas de tetromino actif
 */
export function getShadowPosition() {
    // Si pas de tetromino actif, retourner null
    if (!gameState.currentTetromino) return null;

    let shadowRow = gameState.currentPosition.row;
    while (canPlaceTetromino(gameState.currentTetromino, shadowRow + 1, gameState.currentPosition.col)) {
        shadowRow++;
    }
    return { row: shadowRow, col: gameState.currentPosition.col };
}