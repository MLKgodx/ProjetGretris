/**
 * @file api.js
 * @description Fonctions de communication avec le serveur (scores, sauvegardes)
 */

import { gameState } from './game-state.js';
import { isGuestMode } from './game-state.js';

/**
 * Crée une nouvelle partie dans la base de données
 * @returns {Promise<number|null>} ID de la partie créée ou null en cas d'erreur
 */
export async function createGame() {
    // Si nous sommes en mode invité, ne pas créer de partie
    if (isGuestMode()) {
        return null;
    }

    try {
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
    }
}

/**
 * Sauvegarde le score à la fin de la partie
 * @returns {Promise<boolean>} Vrai si la sauvegarde a réussi
 */
export async function saveScore() {
    // Si pas d'ID de partie ou mode invité, ne pas sauvegarder
    if (!gameState.gameId || isGuestMode()) {
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