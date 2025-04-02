/**
 * @file game-state.js
 * @description Gestion de l'état du jeu et des variables globales
 */

import { GRID_CONFIG } from './config.js';

/**
 * État global du jeu
 */
export const gameState = {
    // Grilles
    grid: [],                    // Grille principale du jeu
    colorGrid: [],               // Grille de couleurs (pour le rendu)
    
    // Statistiques de jeu
    score: 0,                    // Score actuel
    timeElapsed: 0,              // Temps écoulé en secondes
    linesCleared: 0,             // Nombre de lignes effacées
    piecesDropped: 0,            // Nombre de pièces placées
    breakCount: 0,               // Nombre de cassures de pièces
    
    // État actuel
    isGameOver: false,           // Indique si le jeu est terminé
    isPaused: false,             // Indique si le jeu est en pause
    gameId: null,                // ID de la partie en cours (pour la sauvegarde)
    
    // Tetromino actuel
    currentTetromino: null,      // Forme actuelle
    currentTetrominoType: '',    // Type actuel (i, o, t, etc.)
    currentColor: '',            // Couleur actuelle
    currentPosition: {           // Position actuelle
        row: 0,
        col: 0
    },
    
    // Prochain tetromino (pour l'aperçu)
    nextTetromino: null,
    nextTetrominoType: ''
};

/**
 * Timers du jeu
 */
export const timers = {
    gameInterval: null,          // Intervalle principal du jeu
    timerInterval: null          // Intervalle de mise à jour du chronomètre
};

/**
 * Réinitialise l'état du jeu à ses valeurs par défaut
 */
export function resetGameState() {
    // Réinitialiser les grilles
    gameState.grid = Array.from({ length: GRID_CONFIG.ROWS }, () => Array(GRID_CONFIG.COLS).fill(' '));
    gameState.colorGrid = Array.from({ length: GRID_CONFIG.ROWS }, () => Array(GRID_CONFIG.COLS).fill(' '));
    
    // Réinitialiser les statistiques
    gameState.score = 0;
    gameState.timeElapsed = 0;
    gameState.linesCleared = 0;
    gameState.piecesDropped = 0;
    gameState.breakCount = 0;
    
    // Réinitialiser l'état
    gameState.isGameOver = false;
    gameState.isPaused = false;
    gameState.gameId = null;
    
    // Réinitialiser le tetromino
    gameState.currentTetromino = null;
    gameState.currentTetrominoType = '';
    gameState.currentColor = '';
    gameState.currentPosition = { row: 0, col: 0 };
    gameState.nextTetromino = null;
    gameState.nextTetrominoType = '';
}

/**
 * Vérifie si le jeu est en mode invité
 * @returns {boolean} Vrai si le jeu est en mode invité
 */
export function isGuestMode() {
    return window.location.pathname.includes('guest.php');
}