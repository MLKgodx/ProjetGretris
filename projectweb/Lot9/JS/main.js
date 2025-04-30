/**
 * @file main.js
 * @description Point d'entrée principal du jeu Tetris
 */

import { startNewGame } from './init.js';

// Exposer la fonction au contexte global pour être appelée depuis le HTML
window.startNewGame = startNewGame;

/**
 * Initialisation du jeu au chargement de la page
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Tetris game initializing...');
    
    // Vérifier que tous les éléments nécessaires sont présents
    const requiredElements = ['grid', 'score', 'timer', 'pauseButton'];
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.error('Éléments manquants dans le DOM:', missingElements.join(', '));
        return;
    }
    
    // Ne plus démarrer automatiquement le jeu ici
    // Le jeu démarrera quand l'utilisateur cliquera sur un bouton qui appelle window.startNewGame()
    console.log('Tetris loaded.');
});