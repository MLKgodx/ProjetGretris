/**
 * @file init.js
 * @description Initialisation du jeu
 */

import { gameState, resetGameState, isGuestMode } from './game-state.js';
import { initializeGrid } from './grid.js';
import { spawnTetromino } from './tetrominos.js';
import { startGameLoop, stopGameLoop } from './game-loop.js';
import { displayGrid } from './renderer.js';
import { initializeControls } from './controls.js';
import { loadBestScore, hideGameOverScreen, updateScore } from './ui.js';
import { createGame } from './api.js';

/**
 * Initialise une nouvelle partie de Tetris
 * Réinitialise toutes les variables d'état et démarre les boucles de jeu
 */
export async function initializeGame() {
    // Réinitialiser la grille
    initializeGrid();

    // Arrêter les intervalles existants s'ils sont actifs
    stopGameLoop();

    // Réinitialiser les variables de jeu
    resetGameState();

    // Charger le meilleur score si l'utilisateur est connecté
    if (!isGuestMode()) {
        loadBestScore();
    }

    // Initialiser les contrôles
    initializeControls();

    // Démarrer le jeu
    spawnTetromino();   // Générer la première pièce
    startGameLoop();    // Démarrer les intervalles pour le jeu et le timer
    displayGrid();      // Mettre à jour l'affichage de la grille
    
    // Réinitialiser les éléments d'affichage
    updateScore();
}

/**
 * Démarre une nouvelle partie
 * Crée une entrée dans la base de données si on n'est pas en mode invité
 */
export async function startNewGame() {
    // Si nous sommes en mode invité, initialiser directement
    if (isGuestMode()) {
        initializeGame();
        return;
    }

    // Sinon, créer une nouvelle partie en base de données
    const gameId = await createGame();
    
    if (gameId) {
        gameState.gameId = gameId;
    }
    
    // Même en cas d'échec de création de partie, démarrer le jeu
    initializeGame();
}

/**
 * Redémarre une partie après un game over
 */
export async function restartGame() {
    // Cacher l'écran de game over
    hideGameOverScreen();

    // Réinitialiser l'état du jeu
    resetGameState();

    // Si nous sommes sur la page guest, on démarre directement le jeu
    if (isGuestMode()) {
        initializeGame();
    } else {
        // Sinon, on crée une nouvelle partie dans la BDD
        const gameId = await createGame();
        
        if (gameId) {
            gameState.gameId = gameId;
        }
        
        initializeGame();
    }

    // Réinitialiser l'affichage
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '00:00';
}