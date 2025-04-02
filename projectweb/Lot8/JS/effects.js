/**
 * @file effects.js
 * @description Effets visuels et animations du jeu
 */

/**
 * Ajoute des effets visuels de cassure à une cellule
 * @param {number} worldRow Rangée dans la grille mondiale
 * @param {number} worldCol Colonne dans la grille mondiale
 */
export function addBreakingEffects(worldRow, worldCol) {
    const cell = document.querySelector(`.cell[data-row="${worldRow}"][data-col="${worldCol}"]`);
    if (cell) {
        // Ajouter la classe de cassure
        cell.classList.add('breaking');

        // Créer un overlay de fissure
        const crackOverlay = document.createElement('div');
        crackOverlay.classList.add('crack-overlay');
        cell.appendChild(crackOverlay);

        // Générer des particules
        for (let k = 0; k < 10; k++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            cell.appendChild(particle);
        }

        // Nettoyer les effets après l'animation
        setTimeout(() => {
            crackOverlay.remove();
            const particles = cell.querySelectorAll('.particle');
            particles.forEach(p => p.remove());
            cell.classList.remove('breaking');
        }, 500);
    }
}

/**
 * Ajoute un effet de flash lors de la suppression d'une ligne
 * @param {number} row Index de la ligne
 */
export function addLineFlashEffect(row) {
    const cells = document.querySelectorAll(`.cell[data-row="${row}"]`);
    cells.forEach(cell => {
        cell.classList.add('flash');
        
        // Enlever l'effet après l'animation
        setTimeout(() => {
            cell.classList.remove('flash');
        }, 300);
    });
}

/**
 * Ajoute un effet de secousse lors d'une collision
 * @param {HTMLElement} element Élément à secouer
 */
export function addShakeEffect(element) {
    element.classList.add('shake');
    
    // Enlever l'effet après l'animation
    setTimeout(() => {
        element.classList.remove('shake');
    }, 200);
}

/**
 * Ajoute un effet de pulsation lors d'un score élevé
 * @param {HTMLElement} element Élément à faire pulser
 */
export function addPulseEffect(element) {
    element.classList.add('pulse');
    
    // Enlever l'effet après l'animation
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 500);
}