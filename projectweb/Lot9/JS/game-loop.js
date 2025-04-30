/**
 * @file game-loop.js
 * @description Gestion de la boucle principale du jeu et du timing
 */

import { TIMER_CONFIG } from './config.js';
import { gameState, timers } from './game-state.js';
import { moveTetrominoDown } from './tetrominos.js';
import { displayGrid } from './renderer.js';
import { updateTimer } from './ui.js';
import { updatePauseButton } from './ui.js';

/**
 * Démarre ou reprend les boucles de jeu
 */
export function startGameLoop() {
    if (timers.gameInterval) clearInterval(timers.gameInterval);
    if (timers.timerInterval) clearInterval(timers.timerInterval);

    gameState.isGameOver = false;

    const dropSpeed = calculateDropSpeed();
    console.log(`Nouvelle vitesse de descente: ${dropSpeed}ms`);

    timers.gameInterval = setInterval(() => {
        if (!gameState.isGameOver && !gameState.isPaused) {
            moveTetrominoDown();
            displayGrid();
        }
    }, dropSpeed);

    timers.timerInterval = setInterval(() => {
        if (!gameState.isGameOver && !gameState.isPaused) {
            updateTimer();
            clearInterval(timers.gameInterval);
            startGameLoop();
        }
    }, 1000);
}

/**
 * Calcule la vitesse de descente des tetrominos en fonction de différents facteurs
 * @returns {number} Intervalle en millisecondes pour la descente
 */
export function calculateDropSpeed() {
    const timeFactor = Math.floor(gameState.timeElapsed / TIMER_CONFIG.TIME_SPEEDUP_INTERVAL);
    const linesFactor = Math.floor(gameState.linesCleared / TIMER_CONFIG.LINES_SPEEDUP_INTERVAL);
    const breakFactor = Math.floor(gameState.breakCount / TIMER_CONFIG.BREAK_SPEEDUP_INTERVAL);

    const timeReduction = timeFactor * TIMER_CONFIG.TIME_SPEEDUP_AMOUNT;
    const linesReduction = linesFactor * TIMER_CONFIG.LINES_SPEEDUP_AMOUNT;
    const breakReduction = breakFactor * TIMER_CONFIG.BREAK_SPEEDUP_AMOUNT;

    const speed = TIMER_CONFIG.BASE_SPEED - timeReduction - linesReduction - breakReduction;

    console.log(`Temps: ${gameState.timeElapsed}s, Lignes: ${gameState.linesCleared}, Cassures: ${gameState.breakCount}, Vitesse: ${speed}ms`);
    return Math.max(speed, TIMER_CONFIG.MIN_SPEED);
}

/**
 * Active ou désactive la pause du jeu
 */
export function togglePause() {
    if (gameState.isPaused) {
        // Reprendre le jeu
        gameState.isPaused = false;
        updatePauseButton(false);
        startGameLoop(); // Redémarrer les intervalles
    } else {
        // Mettre le jeu en pause
        gameState.isPaused = true;
        updatePauseButton(true);
        clearInterval(timers.gameInterval); // Arrêter les intervalles
        clearInterval(timers.timerInterval);
    }
}

/**
 * Arrête complètement la boucle de jeu
 */
export function stopGameLoop() {
    if (timers.gameInterval) clearInterval(timers.gameInterval);
    if (timers.timerInterval) clearInterval(timers.timerInterval);
    
    timers.gameInterval = null;
    timers.timerInterval = null;
}