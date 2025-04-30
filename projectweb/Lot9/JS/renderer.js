/**
 * @file renderer.js
 * @description Gestion de l'affichage et du rendu du jeu
 */

import { GRID_CONFIG } from './config.js';
import { gameState } from './game-state.js';
import { getShadowPosition } from './tetrominos.js';

/**
 * Affiche la grille et le tetromino actuel dans le DOM
 */
export function displayGrid() {
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = '';

    // Créer une copie temporaire de la grille
    const tempGrid = gameState.grid.map(row => [...row]);

    // Ajouter l'ombre
    const shadowPosition = getShadowPosition();
    if (shadowPosition) {
        for (let i = 0; i < gameState.currentTetromino.length; i++) {
            for (let j = 0; j < gameState.currentTetromino[i].length; j++) {
                if (gameState.currentTetromino[i][j].value === 1 && shadowPosition.row + i >= 0) {
                    tempGrid[shadowPosition.row + i][shadowPosition.col + j] = 'X';
                }
            }
        }
    }

    // Ajouter le tetromino actif
    if (gameState.currentTetromino) {
        for (let i = 0; i < gameState.currentTetromino.length; i++) {
            for (let j = 0; j < gameState.currentTetromino[i].length; j++) {
                if (gameState.currentTetromino[i][j].value === 1 && gameState.currentPosition.row + i >= 0) {
                    tempGrid[gameState.currentPosition.row + i][gameState.currentPosition.col + j] = {
                        type: 'active',
                        tetrominoType: gameState.currentTetrominoType,
                        durability: gameState.currentTetromino[i][j].durability
                    };
                }
            }
        }
    }

    // Générer les cellules
    for (let row = 0; row < GRID_CONFIG.ROWS; row++) {
        for (let col = 0; col < GRID_CONFIG.COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            const cellData = tempGrid[row][col];

            if (cellData === 'X') {
                cell.className = 'cell shadow';
            } else if (typeof cellData === 'object') {
                if (cellData.type === 'active') {
                    cell.className = `cell tetromino tetromino-${cellData.tetrominoType}`;
                    if (cellData.durability === 2) {
                        cell.classList.add('durability-2');
                    } else if (cellData.durability === 1) {
                        cell.classList.add('durability-1');
                    }
                } else if (cellData.type === 'placed') {
                    cell.className = `cell placed tetromino tetromino-${cellData.tetrominoType}`;
                }
            } else {
                cell.className = 'cell libre';
            }

            gridDiv.appendChild(cell);
        }
    }
}