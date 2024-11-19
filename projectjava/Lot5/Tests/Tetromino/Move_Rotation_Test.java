package Tests.Tetromino;

public class Move_Rotation_Test {

    // Formes de tétrimino
    private static final int[][][] TETROMINOS = {
        {{0, 1, 0}, {0, 1, 0}, {0, 1, 0}, {0, 1, 0}}, // I
        {{1, 1}, {1, 1}}, // O
        {{0, 1, 0}, {1, 1, 1}}, // T
        {{1, 1, 0}, {0, 1, 1}}, // S
        {{0, 1, 1}, {1, 1, 0}}, // Z
        {{1, 1, 1}, {1, 0, 0}}, // L
        {{1, 1, 1}, {0, 0, 1}} // J
    };

    private int[][] currentTetromino;
    private Position currentPosition;
    private static final int BOARD_ROWS = 20;
    private static final int BOARD_COLS = 10;
    private int[][] board;

    public Move_Rotation_Test() {
        // Initialisation avec un tétrimino au hasard
        int randomIndex = (int) (Math.random() * TETROMINOS.length);
        currentTetromino = TETROMINOS[randomIndex];
        currentPosition = new Position(5, 5); // Position initiale
        board = new int[BOARD_ROWS][BOARD_COLS]; // Créer une grille vide
    }

    // Afficher la grille avec la position actuelle du tétrimino
    private void printBoard() {
        // Vider la grille
        for (int i = 0; i < BOARD_ROWS; i++) {
            for (int j = 0; j < BOARD_COLS; j++) {
                board[i][j] = 0; // 0 signifie cellule vide
            }
        }

        // Placer le tétrimino actuel sur la grille
        for (int i = 0; i < currentTetromino.length; i++) {
            for (int j = 0; j < currentTetromino[i].length; j++) {
                if (currentTetromino[i][j] == 1) {
                    int row = currentPosition.row + i;
                    int col = currentPosition.col + j;
                    if (row >= 0 && row < BOARD_ROWS && col >= 0 && col < BOARD_COLS) {
                        board[row][col] = 1; // 1 signifie cellule occupée par le tétrimino
                    }
                }
            }
        }

        // Affichage de la grille
        for (int i = 0; i < BOARD_ROWS; i++) {
            for (int j = 0; j < BOARD_COLS; j++) {
                if (board[i][j] == 1) {
                    System.out.print("X "); // Tétrimino affiché par un X
                } else {
                    System.out.print(". "); // Vide affiché par un point
                }
            }
            System.out.println();
        }
        System.out.println();
    }

    // Afficher les coordonnées des pièces placées
    private void printPiecePositions() {
        System.out.println("Coordonnées du tétrimino:");
        for (int i = 0; i < currentTetromino.length; i++) {
            for (int j = 0; j < currentTetromino[i].length; j++) {
                if (currentTetromino[i][j] == 1) {
                    int row = currentPosition.row + i;
                    int col = currentPosition.col + j;
                    System.out.println("Position (" + row + ", " + col + ")");
                }
            }
        }
        System.out.println();
    }

    // Test de déplacement à gauche
    private void testMoveLeft() {
        System.out.println("Avant déplacement à gauche:");
        printBoard(); // Affiche la grille avant le mouvement
        printPiecePositions(); // Affiche les coordonnées avant le mouvement

        moveTetromino(-1);

        System.out.println("Après déplacement à gauche:");
        printBoard(); // Affiche la grille après le mouvement
        printPiecePositions(); // Affiche les coordonnées après le mouvement
    }

    // Test de déplacement à droite
    private void testMoveRight() {
        System.out.println("Avant déplacement à droite:");
        printBoard(); // Affiche la grille avant le mouvement
        printPiecePositions(); // Affiche les coordonnées avant le mouvement

        moveTetromino(1);

        System.out.println("Après déplacement à droite:");
        printBoard(); // Affiche la grille après le mouvement
        printPiecePositions(); // Affiche les coordonnées après le mouvement
    }

    // Test du mouvement vers le bas
    private void testMoveDown() {
        System.out.println("Avant déplacement vers le bas:");
        printBoard(); // Affiche la grille avant le mouvement
        printPiecePositions(); // Affiche les coordonnées avant le mouvement

        moveTetrominoDown();

        System.out.println("Après déplacement vers le bas:");
        printBoard(); // Affiche la grille après le mouvement
        printPiecePositions(); // Affiche les coordonnées après le mouvement
    }

    // Test de rotation du tétrimino uniquement pour les tétriminos non carrés
    private void testRotateTetromino() {
        if (currentTetromino.length != currentTetromino[0].length) { // Ne pas tester sur les tétriminos carrés
            System.out.println("Avant rotation:");
            printBoard(); // Affiche la grille avant la rotation
            printPiecePositions(); // Affiche les coordonnées avant la rotation

            rotateTetromino();

            System.out.println("Après rotation:");
            printBoard(); // Affiche la grille après la rotation
            printPiecePositions(); // Affiche les coordonnées après la rotation
        } else {
            System.out.println("Rotation ignorée pour un tétrimino carré.");
            System.out.println();
        }
    }

    // Déplacer le tétrimino
    private void moveTetromino(int direction) {
        currentPosition.col += direction;
    }

    // Déplacer le tétrimino vers le bas
    private void moveTetrominoDown() {
        currentPosition.row++;
    }

    // Rotation du tétrimino
    private void rotateTetromino() {
        int[][] rotated = new int[currentTetromino[0].length][currentTetromino.length];
        for (int i = 0; i < currentTetromino.length; i++) {
            for (int j = 0; j < currentTetromino[i].length; j++) {
                rotated[j][currentTetromino.length - 1 - i] = currentTetromino[i][j];
            }
        }
        currentTetromino = rotated;
    }

    // Test de tous les mouvements et rotations
    public static void main(String[] args) {
        Move_Rotation_Test tetrisGame = new Move_Rotation_Test();

        tetrisGame.testMoveLeft();       // Test du mouvement à gauche
        tetrisGame.testMoveRight();      // Test du mouvement à droite
        tetrisGame.testMoveDown();       // Test du mouvement vers le bas
        tetrisGame.testRotateTetromino(); // Test de la rotation du tétrimino
    }

    // Classe interne pour la position du tétrimino
    private static class Position {
        int row, col;
        Position(int row, int col) {
            this.row = row;
            this.col = col;
        }
    }
}
