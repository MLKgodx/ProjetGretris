/**
 * @file api.js
 * @description Fonctions de communication avec le serveur (scores, sauvegardes)
 */

import { gameState } from './game-state.js';
import { isGuestMode } from './game-state.js';

// Variable pour suivre si une création de partie est en cours
let isCreatingGame = false;

/**
 * Crée une nouvelle partie dans la base de données
 * @param {boolean} force - Forcer la création même si un ID existe déjà
 * @returns {Promise<number|null>} ID de la partie créée ou null en cas d'erreur
 */
export async function createGame(force = false) {
    // Si nous sommes en mode invité, ne pas créer de partie
    if (isGuestMode()) {
        console.log("Mode invité détecté, pas de création de partie");
        return null;
    }

    // Si une partie existe déjà et que nous ne forçons pas la création, retourner l'ID existant
    if (gameState.gameId && !force) {
        console.log("Une partie existe déjà avec ID:", gameState.gameId);
        return gameState.gameId;
    }

    // Si une création est déjà en cours, éviter les doublons
    if (isCreatingGame) {
        console.log("Création de partie déjà en cours, opération ignorée");
        return null;
    }

    isCreatingGame = true;
    
    try {
        console.log("Tentative de création d'une nouvelle partie...");
        const response = await fetch('../controller/createGame.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('Nouvelle partie créée avec ID:', data.gameId);
            return data.gameId;
        } else {
            console.error('Erreur création partie:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Erreur fetch:', error);
        return null;
    } finally {
        isCreatingGame = false;
    }
}

/**
 * Sauvegarde le score à la fin de la partie
 * @returns {Promise<boolean>} Vrai si la sauvegarde a réussi
 */
export async function saveScore() {
    // Vérification détaillée des conditions
    if (isGuestMode()) {
        console.log("Sauvegarde ignorée: mode invité activé");
        return false;
    }
    
    if (!gameState.gameId) {
        console.log("Sauvegarde ignorée: pas d'ID de partie");
        return false;
    }

    try {
        const gameData = {
            gameId: gameState.gameId,
            score: gameState.score,
            linesCleared: gameState.linesCleared,
            piecesDropped: gameState.piecesDropped,
            playTime: gameState.timeElapsed
        };

        console.log("Tentative de sauvegarde du score pour la partie ID:", gameState.gameId);
        console.log("Données envoyées:", gameData);

        const response = await fetch('../controller/saveScore.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('Score sauvegardé avec succès:', data.message);
            return true;
        } else {
            console.error('Erreur lors de la sauvegarde du score:', data.error);
            return false;
        }
    } catch (error) {
        console.error('Erreur de communication avec le serveur:', error);
        return false;
    }
}

/**
 * Récupère le meilleur score du joueur
 * @returns {Promise<number|null>} Meilleur score ou null en cas d'erreur
 */
export async function getBestScore() {
    try {
        const response = await fetch('../controller/getBestScore.php');
        const data = await response.json();
        
        if (data.success) {
            return data.bestScore;
        } else {
            console.error('Erreur lors du chargement du meilleur score:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Erreur de communication avec le serveur:', error);
        return null;
    }
}