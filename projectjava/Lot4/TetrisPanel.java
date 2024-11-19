import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Arrays;
import java.util.Random;

public class TetrisPanel extends JPanel implements ActionListener {
    private static final int ROWS = 20;
    private static final int COLS = 10;
    private static final int CELL_SIZE = 30;
    private String[][] grid = new String[ROWS][COLS];
    private int[][] currentTetromino;
    private Position currentPosition;
    private boolean gameOver = false;
    private Timer timer;
    private Color currentColor; // Couleur du tétrimino actuel

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

    // Couleurs pour chaque tétrimino
    private static final Color[] TETROMINO_COLORS = {
        Color.CYAN,    // I
        Color.YELLOW,  // O
        Color.MAGENTA, // T
        Color.GREEN,   // S
        Color.RED,     // Z
        Color.ORANGE,  // L
        Color.BLUE     // J
    };

    public TetrisPanel() {
        setPreferredSize(new Dimension(COLS * CELL_SIZE, ROWS * CELL_SIZE));
        setBackground(Color.BLACK);
        initializeGrid();
        spawnTetromino();
        
        timer = new Timer(1000, this);
        timer.start();

        setFocusable(true);
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (gameOver) return;

                switch (e.getKeyCode()) {
                    case KeyEvent.VK_LEFT: moveTetromino(-1); break;
                    case KeyEvent.VK_RIGHT: moveTetromino(1); break;
                    case KeyEvent.VK_DOWN: moveTetrominoDown(); break;
                    case KeyEvent.VK_UP: rotateTetromino(); break;
                }
                repaint();
            }
        });
    }

    private void initializeGrid() {
        for (int i = 0; i < ROWS; i++) {
            Arrays.fill(grid[i], " ");
        }
    }

    private void spawnTetromino() {
        int randomIndex = new Random().nextInt(TETROMINOS.length);
        currentTetromino = TETROMINOS[randomIndex];
        currentColor = TETROMINO_COLORS[randomIndex]; // Associer la couleur
        currentPosition = new Position(0, COLS / 2 - currentTetromino[0].length / 2);

        if (!canPlaceTetromino(currentTetromino, currentPosition.row, currentPosition.col)) {
            gameOver = true;
            timer.stop();
            JOptionPane.showMessageDialog(this, "Game Over");
        }
    }

    private boolean canPlaceTetromino(int[][] tetromino, int row, int col) {
        for (int i = 0; i < tetromino.length; i++) {
            for (int j = 0; j < tetromino[i].length; j++) {
                if (tetromino[i][j] == 1) {
                    int newRow = row + i;
                    int newCol = col + j;
                    if (newRow >= ROWS || newCol < 0 || newCol >= COLS || (newRow >= 0 && !grid[newRow][newCol].equals(" "))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private void placeTetromino(int[][] tetromino, int row, int col) {
        for (int i = 0; i < tetromino.length; i++) {
            for (int j = 0; j < tetromino[i].length; j++) {
                if (tetromino[i][j] == 1 && row + i >= 0) {
                    grid[row + i][col + j] = "X";
                }
            }
        }
    }

    private void clearFullLines() {
        for (int i = 0; i < ROWS; i++) {
            if (Arrays.stream(grid[i]).allMatch(cell -> cell.equals("X"))) {
                for (int j = i; j > 0; j--) {
                    grid[j] = Arrays.copyOf(grid[j - 1], COLS);
                }
                grid[0] = new String[COLS];
                Arrays.fill(grid[0], " ");
            }
        }
    }

    private void moveTetrominoDown() {
        if (canPlaceTetromino(currentTetromino, currentPosition.row + 1, currentPosition.col)) {
            currentPosition.row++;
        } else {
            placeTetromino(currentTetromino, currentPosition.row, currentPosition.col);
            clearFullLines();
            spawnTetromino();
        }
    }

    private void moveTetromino(int direction) {
        int newCol = currentPosition.col + direction;
        if (canPlaceTetromino(currentTetromino, currentPosition.row, newCol)) {
            currentPosition.col = newCol;
        }
    }

    private void rotateTetromino() {
        int[][] rotated = new int[currentTetromino[0].length][currentTetromino.length];
        for (int i = 0; i < currentTetromino.length; i++) {
            for (int j = 0; j < currentTetromino[i].length; j++) {
                rotated[j][currentTetromino.length - 1 - i] = currentTetromino[i][j];
            }
        }

        if (canPlaceTetromino(rotated, currentPosition.row, currentPosition.col)) {
            currentTetromino = rotated;
        }
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // Dessiner la grille et les tétrimino placés
        for (int row = 0; row < ROWS; row++) {
            for (int col = 0; col < COLS; col++) {
                if (grid[row][col].equals("X")) {
                    g.setColor(Color.BLUE);
                    g.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                } else {
                    g.setColor(Color.DARK_GRAY);
                    g.drawRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }

        // Dessiner le tétrimino en chute avec sa couleur
        g.setColor(currentColor);
        for (int i = 0; i < currentTetromino.length; i++) {
            for (int j = 0; j < currentTetromino[i].length; j++) {
                if (currentTetromino[i][j] == 1) {
                    int x = (currentPosition.col + j) * CELL_SIZE;
                    int y = (currentPosition.row + i) * CELL_SIZE;
                    g.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        moveTetrominoDown();
        repaint();
    }

    private static class Position {
        int row, col;
        Position(int row, int col) {
            this.row = row;
            this.col = col;
        }
    }
}
