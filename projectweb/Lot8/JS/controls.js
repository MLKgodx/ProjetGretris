/**
 * @file controls.js
 * @description Gestion des contrôles utilisateur
 */

import { gameState } from './game-state.js';
import { moveTetromino, moveTetrominoDown, rotateTetromino } from './tetrominos.js';
import { displayGrid } from './renderer.js';
import { togglePause } from './game-loop.js';

/**
 * Gère les événements clavier pour le contrôle du jeu
 * @param {KeyboardEvent} event Événement clavier
 */
export function handleKeyPress(event) {
    // Ignorer les touches si le jeu est terminé
    if (gameState.isGameOver) return;

    // Si le jeu est en pause, seules certaines touches sont autorisées
    if (gameState.isPaused) {
        if (event.key === ' ') {
            togglePause(); // Permettre de reprendre le jeu avec la touche Espace
        }
        return;
    }

    switch (event.key) {
        case 'ArrowLeft':
            moveTetromino(-1);
            break;
        case 'ArrowRight':
            moveTetromino(1);
            break;
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowUp':
            rotateTetromino();
            break;
        case ' ':
            togglePause(); // Activer ou désactiver la pause avec la touche Espace
            break;
    }
    displayGrid();
}

/**
 * Initialise les écouteurs d'événements pour les contrôles
 */
export function initializeControls() {
    // Écouteur d'événements pour le clavier
    document.addEventListener('keydown', handleKeyPress);
    
    // Écouteur d'événements pour le bouton de pause
    const pauseButton = document.getElementById('pauseButton');
    if (pauseButton) {
        pauseButton.addEventListener('click', togglePause);
    }
    
    // Bouton de redémarrage après game over
    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            // Importer dynamiquement pour éviter les dépendances circulaires
            import('./init.js').then(module => {
                module.restartGame();
            });
        });
    }
    
    // Bouton pour retourner à l'accueil
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            // Importer dynamiquement pour éviter les dépendances circulaires
            import('./end-game.js').then(module => {
                module.goToHome();
            });
        });
    }
}

/**
 * Supprime les écouteurs d'événements des contrôles
 */
export function removeControls() {
    document.removeEventListener('keydown', handleKeyPress);
}