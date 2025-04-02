/**
 * @file grid.js
 * @description Gestion de la grille de jeu (lignes, gravité)
 */

import { GRID_CONFIG, SCORE_CONFIG } from './config.js';
import { gameState } from './game-state.js';
import { displayGrid } from './renderer.js';
import { updateScore } from './ui.js';

/**
 * Initialise la grille de jeu avec des cellules vides
 */
export function initializeGrid() {
    gameState.grid = Array.from({ length: GRID_CONFIG.ROWS }, () => Array(GRID_CONFIG.COLS).fill(' '));
    gameState.colorGrid = Array.from({ length: GRID_CONFIG.ROWS }, () => Array(GRID_CONFIG.COLS).fill(' '));
}

/**
 * Vérifie et supprime les lignes complètes, puis met à jour le score
 * @returns {number} Nombre de lignes effacées
 */
export function clearFullLines() {
    let totalLinesCleared = 0;
    let combo = 0;

    // Vérifier chaque ligne de bas en haut
    for (let row = GRID_CONFIG.ROWS - 1; row >= 0; row--) {
        // Vérifier si la ligne est complète
        if (gameState.grid[row].every(cell => typeof cell === 'object' && cell.type === 'placed')) {
            // Augmenter le combo pour chaque ligne consécutive
            combo++;
            totalLinesCleared++;

            // Supprimer la ligne complète
            gameState.grid.splice(row, 1);
            gameState.colorGrid.splice(row, 1);

            // Ajouter une nouvelle ligne vide en haut
            gameState.grid.unshift(Array(GRID_CONFIG.COLS).fill(' '));
            gameState.colorGrid.unshift(Array(GRID_CONFIG.COLS).fill(' '));

            // Réajuster l'index pour vérifier la même position
            row++;

            // Appliquer la gravité après chaque ligne supprimée
            applyGravity();
        }
    }

    // Calculer le score basé sur le combo
    if (totalLinesCleared > 0) {
        const baseScore = SCORE_CONFIG.BASE_SCORE;
        const comboMultiplier = Math.pow(SCORE_CONFIG.COMBO_MULTIPLIER, combo - 1);
        gameState.score += baseScore * totalLinesCleared * comboMultiplier;
        gameState.linesCleared += totalLinesCleared;

        // Mise à jour de l'affichage
        updateScore();

        // Retourner le nombre de lignes effacées
        return totalLinesCleared;
    }

    return 0;
}

/**
 * Applique un effet de gravité aux blocs flottants
 * @returns {boolean} Vrai si des blocs ont été déplacés
 */
export function applyGravity() {
    let moved = false;

    for (let row = GRID_CONFIG.ROWS - 1; row > 0; row--) {
        for (let col = 0; col < GRID_CONFIG.COLS; col++) {
            if (gameState.grid[row][col] === ' ' && gameState.grid[row - 1][col] !== ' ') {
                // Copier la cellule du dessus
                gameState.grid[row][col] = gameState.grid[row - 1][col];
                gameState.colorGrid[row][col] = gameState.colorGrid[row - 1][col];

                // Vider la cellule du dessus
                gameState.grid[row - 1][col] = ' ';
                gameState.colorGrid[row - 1][col] = ' ';

                moved = true;
            }
        }
    }

    if (moved) {
        displayGrid();
        requestAnimationFrame(() => {
            const cells = document.querySelectorAll('.placed');
            cells.forEach(cell => {
                cell.classList.add('falling');
                cell.addEventListener('animationend', () => {
                    cell.classList.remove('falling');
                    cell.classList.add('impact');
                    setTimeout(() => cell.classList.remove('impact'), 200);
                }, { once: true });
            });
        });
    }

    return moved;
}