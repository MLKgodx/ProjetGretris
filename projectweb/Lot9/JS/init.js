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
    console.log("Initialisation du jeu avec ID actuel:", gameState.gameId);

    // Sauvegarder l'ID de partie avant la réinitialisation
    const currentGameId = gameState.gameId;

    // Réinitialiser la grille
    initializeGrid();

    // Arrêter les intervalles existants s'ils sont actifs
    stopGameLoop();

    // Réinitialiser les variables de jeu en préservant l'ID
    resetGameState();

    // S'assurer que l'ID est toujours présent après resetGameState
    if (currentGameId && !gameState.gameId) {
        console.log("Restauration de l'ID après réinitialisation:", currentGameId);
        gameState.gameId = currentGameId;
    }

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

    console.log("Jeu initialisé avec ID final:", gameState.gameId);
}

/**
 * Démarre une nouvelle partie
 * Crée une entrée dans la base de données si on n'est pas en mode invité
 */
export async function startNewGame() {
    console.log("Démarrage d'une nouvelle partie");

    // Si nous sommes en mode invité, initialiser directement
    if (isGuestMode()) {
        console.log("Mode invité, pas de création de partie");
        initializeGame();
        return;
    }

    try {
        // Créer une nouvelle partie en base de données
        console.log("Création d'une nouvelle partie en BDD");
        const gameId = await createGame(true); // Force=true pour garantir une nouvelle partie

        if (gameId) {
            console.log("ID de partie obtenu:", gameId);
            gameState.gameId = gameId;

            // Attendre que l'ID soit bien assigné avant d'initialiser le jeu
            setTimeout(() => {
                console.log("Initialisation du jeu avec ID:", gameState.gameId);
                initializeGame();
            }, 50);
        } else {
            console.error("Échec de création d'ID de partie");
            initializeGame(); // Initialiser quand même
        }
    } catch (error) {
        console.error("Erreur lors du démarrage:", error);
        initializeGame(); // Initialiser en cas d'erreur
    }
}

// Variable pour empêcher les appels multiples à restartGame()
let isRestarting = false;

/**
 * Redémarre une partie après un game over
 * Avec protection contre les appels multiples
 */
export async function restartGame() {
    // Protection contre les appels multiples
    if (isRestarting) {
        console.log("Redémarrage déjà en cours, requête ignorée");
        return;
    }

    isRestarting = true;

    try {
        console.log("Redémarrage du jeu après game over");

        // Cacher l'écran de game over
        hideGameOverScreen();

        // Réinitialiser l'état du jeu en forçant l'effacement de l'ID
        gameState.gameId = null;
        resetGameState();

        // Processus synchronisé pour éviter les initialisations prématurées
        try {
            // Si nous sommes sur la page guest, on démarre directement le jeu
            if (isGuestMode()) {
                console.log("Mode invité, initialisation directe");
                initializeGame();
            } else {
                // Sinon, on crée d'abord une nouvelle partie dans la BDD
                console.log("Création d'une nouvelle partie...");
                const gameId = await createGame(true); // Force=true pour garantir une nouvelle partie

                // Attendre que la requête soit complète avant de continuer
                if (gameId) {
                    console.log("Nouvelle partie créée:", gameId);
                    gameState.gameId = gameId;

                    // Attendre que l'ID soit bien assigné avant d'initialiser
                    console.log("Initialisation avec le nouvel ID");
                    initializeGame();
                } else {
                    console.error("Échec de création de partie, initialisation sans ID");
                    initializeGame();
                }
            }

            // Réinitialiser l'affichage une fois tout terminé
            document.getElementById('score').textContent = '0';
            document.getElementById('timer').textContent = '00:00';

        } catch (error) {
            console.error("Erreur lors du redémarrage:", error);
            // En cas d'erreur, initialiser quand même le jeu
            initializeGame();

            document.getElementById('score').textContent = '0';
            document.getElementById('timer').textContent = '00:00';
        }
    } catch (error) {
        console.error("Erreur critique lors du redémarrage:", error);
    } finally {
        // S'assurer que la protection est désactivée à la fin, même en cas d'erreur
        setTimeout(() => {
            isRestarting = false;
            console.log("Protection de redémarrage désactivée");
        }, 1000); // Délai de 1 seconde pour éviter les clics rapides
    }
}