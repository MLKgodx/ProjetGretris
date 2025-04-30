/**
 * @file ui.js
 * @description Gestion de l'interface utilisateur
 */

import { gameState } from './game-state.js';
import { addPulseEffect } from './effects.js';

/**
 * Met à jour l'affichage du score
 */
export function updateScore() {
    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = `${gameState.score}`;
    
    // Effet visuel de pulsation pour les scores élevés
    if (gameState.score > 0 && gameState.score % 1000 === 0) {
        addPulseEffect(scoreDiv);
    }
}

/**
 * Met à jour l'affichage du chronomètre
 */
export function updateTimer() {
    gameState.timeElapsed++;
    const minutes = Math.floor(gameState.timeElapsed / 60);
    const seconds = gameState.timeElapsed % 60;
    const timerDiv = document.getElementById('timer');
    timerDiv.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Affiche l'écran de game over
 */
export function showGameOverScreen() {
    const gameOverOverlay = document.getElementById('gameOverOverlay');
    const finalScore = document.getElementById('finalScore');
    const finalTime = document.getElementById('finalTime');

    finalScore.textContent = gameState.score;
    finalTime.textContent = document.getElementById('timer').textContent;
    gameOverOverlay.style.display = 'flex';
}

/**
 * Cache l'écran de game over
 */
export function hideGameOverScreen() {
    const gameOverOverlay = document.getElementById('gameOverOverlay');
    gameOverOverlay.style.display = 'none';
}

/**
 * Récupère et affiche le meilleur score du joueur connecté
 */
export function loadBestScore() {
    fetch('../controller/getBestScore.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const bestScoreDiv = document.getElementById('bestScore');
                bestScoreDiv.textContent = `${data.bestScore}`;
            } else {
                console.error('Erreur lors du chargement du meilleur score:', data.error);
            }
        })
        .catch(error => console.error('Erreur de communication avec le serveur:', error));
}

/**
 * Met à jour l'état du bouton de pause
 * @param {boolean} isPaused État de pause
 */
export function updatePauseButton(isPaused) {
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.textContent = isPaused ? 'Reprendre' : 'Pause';
}