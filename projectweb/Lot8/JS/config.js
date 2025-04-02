/**
 * @file config.js
 * @description Configuration et constantes pour le jeu Tetris
 */

/** Configuration de la grille */
export const GRID_CONFIG = {
    ROWS: 20,
    COLS: 10
};

/** Couleurs des pièces */
export const COLORS = [
    '#00FFFF', // Cyan (I)
    '#FFFF00', // Jaune (O)
    '#800080', // Violet (T)
    '#FFA500', // Orange (S)
    '#0000FF', // Bleu (J)
    '#00FF00', // Vert (L)
    '#FF0000'  // Rouge (Z)
];

/** Types de tetrominos avec leurs noms */
export const TETROMINO_TYPES = ['i', 'o', 't', 's', 'z', 'j', 'l', 'x', 'plus'];

/**
 * Définition des formes de tetrominos avec leurs valeurs de durabilité
 * value: 0 = cellule vide, 1 = cellule pleine
 * durability: nombre de coups nécessaires pour détruire la cellule (0 pour vide, 3 pour normal)
 */
export const TETROMINOS = [
    // I
    [
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }],
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }],
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }],
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }]
    ],
    // O
    [
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }],
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }]
    ],
    // T
    [
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }],
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }, { value: 1, durability: 3 }]
    ],
    // S
    [
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }],
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 1, durability: 3 }]
    ],
    // Z
    [
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 1, durability: 3 }],
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }]
    ],
    // L
    [
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }, { value: 1, durability: 3 }],
        [{ value: 1, durability: 3 }, { value: 0, durability: 0 }, { value: 0, durability: 0 }]
    ],
    // J
    [
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }, { value: 1, durability: 3 }],
        [{ value: 0, durability: 0 }, { value: 0, durability: 0 }, { value: 1, durability: 3 }]
    ],
    // X
    [
        [{ value: 1, durability: 3 }, { value: 0, durability: 0 }, { value: 1, durability: 3 }],
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }],
        [{ value: 1, durability: 3 }, { value: 0, durability: 0 }, { value: 1, durability: 3 }]
    ],
    // +
    [
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }],
        [{ value: 1, durability: 3 }, { value: 1, durability: 3 }, { value: 1, durability: 3 }],
        [{ value: 0, durability: 0 }, { value: 1, durability: 3 }, { value: 0, durability: 0 }]
    ]
];

/** Configuration des timers et de la vitesse */
export const TIMER_CONFIG = {
    BASE_SPEED: 1000,             // Vitesse de base (1 seconde)
    MIN_SPEED: 100,               // Vitesse minimale (100ms)
    TIME_SPEEDUP_INTERVAL: 20,    // Réduction toutes les 20 secondes
    TIME_SPEEDUP_AMOUNT: 100,     // Réduction de 100ms par intervalle de temps
    LINES_SPEEDUP_INTERVAL: 5,    // Réduction toutes les 5 lignes
    LINES_SPEEDUP_AMOUNT: 100,    // Réduction de 100ms par intervalle de lignes
    BREAK_SPEEDUP_INTERVAL: 2,    // Réduction toutes les 2 cassures
    BREAK_SPEEDUP_AMOUNT: 50      // Réduction de 50ms par intervalle de cassures
};

/** Configuration du score */
export const SCORE_CONFIG = {
    BASE_SCORE: 100,              // Score de base pour une ligne
    COMBO_MULTIPLIER: 2           // Multiplicateur pour les combos (puissance)
};