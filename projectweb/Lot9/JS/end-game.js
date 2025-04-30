/**
 * @file end-game.js
 * @description Gestion de la fin de partie et redémarrage
 */

import { gameState } from './game-state.js';
import { stopGameLoop } from './game-loop.js';
import { removeControls } from './controls.js';
import { showGameOverScreen } from './ui.js';
import { saveScore } from './api.js';
import { displayGrid } from './renderer.js';

/**
 * Termine la partie en cours et sauvegarde le score
 */
export async function endGame() {
    gameState.isGameOver = true;
    stopGameLoop();
    removeControls();

    // Empêcher le spawning de nouvelles pièces
    gameState.currentTetromino = null;
    displayGrid();

    // Sauvegarder le score et attendre la fin de l'opération
    try {
        const saveResult = await saveScore();
        console.log("Résultat de la sauvegarde du score:", saveResult);
        
        if (!saveResult) {
            console.error("Échec de la sauvegarde du score.");
        }
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du score:", error);
    }

    // Afficher l'écran de game over
    showGameOverScreen();
}

/**
 * Quitte la partie et retourne à l'accueil
 */
export function goToHome() {
    // Nettoyage avant de quitter
    stopGameLoop();
    removeControls();

    // Redirection vers la page d'accueil
    window.location.href = '../view/index.php';
}