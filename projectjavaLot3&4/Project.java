/**
 * The Java class "Project" creates a Tetris game GUI with buttons for guest login, registration, and
 * quitting, featuring a Tetris game panel with timer and pause functionality.
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

public class Project extends JFrame {

    private BackgroundImage backgroundImage;

    @SuppressWarnings("unused")
    public Project() {
        // The code snippet you provided is configuring the main window of the Java Swing application.
        // Here's a breakdown of each line:
        // Configure the main window
        setTitle("Gretris");
        setSize(800, 600);
        setMinimumSize(new Dimension(500, 400));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        // Set up the background image component
        backgroundImage = new BackgroundImage();

        // Set up the button panel
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.setOpaque(false); // Transparent background for buttons

        // Play button
        // The code snippet you provided is creating a JButton named `playButton` with the text "Guest"
        // displayed on it. The `setPreferredSize(new Dimension(100, 50))` method is setting the
        // preferred size of the button to be 100 pixels wide and 50 pixels high.
        JButton playButton = new JButton("Guest");
        playButton.setPreferredSize(new Dimension(100, 50));
        playButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Open Tetris game window
                // The above Java code is creating a JFrame (a window) with the title "Tetris" and
                // setting the default close operation to `DISPOSE_ON_CLOSE`, which means that the
                // JFrame will be disposed when the user closes it.
                JFrame gameFrame = new JFrame("Tetris");
                gameFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

                // Top panel for the timer
                // The above code is creating a JPanel named topPanel and a JLabel named timerLabel
                // with the text "Time: 0s". The timerLabel is then added to the topPanel.
                JPanel topPanel = new JPanel();
                JLabel timerLabel = new JLabel("Time: 0s");
                topPanel.add(timerLabel);

                // Tetris panel in the center
                // The code is creating a TetrisPanel object and passing a timerLabel object as a
                // parameter to its constructor.
                TetrisPanel tetrisPanel = new TetrisPanel(timerLabel);

                // Bottom panel for the pause button
                // The above Java code is creating a JPanel named `bottomPanel` and a JButton named
                // `pauseButton` with the label "Pause". An ActionListener is added to the
                // `pauseButton` to handle the button click event. When the button is clicked, the
                // `actionPerformed` method is called, which toggles the pause state of a `tetrisPanel`
                // object and updates the text of the `pauseButton` to "Resume" if the `tetrisPanel` is
                // paused, or "Pause" if it is not paused.
                JPanel bottomPanel = new JPanel();
                JButton pauseButton = new JButton("Pause");
                pauseButton.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        tetrisPanel.togglePause();
                        pauseButton.setText(tetrisPanel.isPaused() ? "Resume" : "Pause");
                    }
                });
                bottomPanel.add(pauseButton);

                // Layout setup for the Tetris game frame
                // The above Java code is setting up the layout for a game frame using BorderLayout. It
                // adds three panels (topPanel, tetrisPanel, bottomPanel) to the gameFrame with
                // topPanel at the NORTH position, tetrisPanel at the CENTER position, and bottomPanel
                // at the SOUTH position. The code then packs the components within the frame, centers
                // the frame on the screen, and finally makes the frame visible to the user.
                gameFrame.setLayout(new BorderLayout());
                gameFrame.add(topPanel, BorderLayout.NORTH);
                gameFrame.add(tetrisPanel, BorderLayout.CENTER);
                gameFrame.add(bottomPanel, BorderLayout.SOUTH);

                gameFrame.pack();
                gameFrame.setLocationRelativeTo(null);
                gameFrame.setVisible(true);

                // Test: Print the grid values
                tetrisPanel.printGrid();

                // Test: Modify an element in the grid and check the result
                // The above Java code is modifying a cell in a Tetris panel grid at position (5, 5) to
                // have the color red. It then prints out a message indicating that the cell at
                // position (5, 5) has been modified to red, followed by printing the updated grid with
                // the modified cell.
                tetrisPanel.modifyGridCell(5, 5, Color.RED);
                System.out.println("Modified cell (5,5) to RED:");
                tetrisPanel.printGrid();
            }
        });

        // The above Java code is creating a JButton with the text "Login" and setting its preferred
        // size to 100x50 pixels. It also adds an ActionListener to the button that displays a message
        // dialog saying "Login!" when the button is clicked.
        // Login button
        JButton loginButton = new JButton("Login");
        loginButton.setPreferredSize(new Dimension(100, 50));
        loginButton.addActionListener(e -> JOptionPane.showMessageDialog(null, "Login!"));

        // The above Java code is creating a JButton with the text "Quit" and setting its preferred
        // size to 100x50 pixels. It then adds an ActionListener to the button that calls
        // System.exit(0) when the button is clicked, effectively quitting the program.
        // Quit button
        JButton quitButton = new JButton("Quit");
        quitButton.setPreferredSize(new Dimension(100, 50));
        quitButton.addActionListener(e -> System.exit(0));

        // The above Java code is creating a JButton with the text "Registration" and setting its
        // preferred size to 120x50 pixels. It also adds an ActionListener to the button that displays
        // a message dialog saying "Registration!" when the button is clicked.
        // Registration button
        JButton registrationButton = new JButton("Registration");
        registrationButton.setPreferredSize(new Dimension(120, 50));
        registrationButton.addActionListener(e -> JOptionPane.showMessageDialog(null, "Registration!"));

        // The above code is adding buttons to a panel in a Java program. The buttons being added are
        // `playButton`, `loginButton`, `quitButton`, and `registrationButton`.
        // Add buttons to the panel
        buttonPanel.add(playButton);
        buttonPanel.add(loginButton);
        buttonPanel.add(quitButton);
        buttonPanel.add(registrationButton);

        // The above code is adding components to the main frame in a Java GUI application. It is
        // adding a background image component to the center of the frame and a button panel component
        // to the south (bottom) of the frame using BorderLayout.
        // Add components to the main frame
        add(backgroundImage, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        // The above code is setting the visibility of a graphical component to true, making it visible
        // on the screen.
        setVisible(true);
    }

   /**
    * The class BackgroundImage is an inner class in Java that extends JComponent and is used for
    * displaying a background image in a GUI component.
    */
    // Inner class for the background image
    class BackgroundImage extends JComponent {
        private Image image;

        public BackgroundImage() {
            image = new ImageIcon("./ressources/Gretris_Tetris_Wallpaper.png").getImage();
        }

        /**
         * The `paintComponent` method overrides the default painting behavior to draw an image on a
         * component.
         * 
         * @param g The parameter `g` in the `paintComponent` method is an instance of the `Graphics`
         * class. It is used for drawing on the component, such as shapes, text, and images. In this
         * code snippet, the `g.drawImage` method is used to draw an image on the component
         */
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            g.drawImage(image, 0, 0, getWidth(), getHeight(), this);
        }

       /**
        * The getMinimumSize method in Java overrides the default implementation to return a Dimension
        * object with a width of 400 and height of 300.
        * 
        * @return A Dimension object with width 400 and height 300 is being returned.
        */
        @Override
        public Dimension getMinimumSize() {
            return new Dimension(400, 300);
        }
    }

    /**
     * The TetrisPanel class represents a panel for a Tetris game with a grid, timer, and pause
     * functionality.
     */
    // Inner Tetris panel class
    class TetrisPanel extends JPanel {
        private static final int ROWS = 20;
        private static final int COLUMNS = 10;
        private static final int CELL_SIZE = 30;
        private Color[][] grid;
        private Timer gameTimer;
        private boolean isPaused = false;

        // The above Java code snippet is creating a TetrisPanel class constructor that takes a JLabel
        // as a parameter. Inside the constructor, it initializes a grid of colors for a Tetris game,
        // sets the preferred size of the panel based on the grid size, and creates a Timer object that
        // updates a timer label with the elapsed time in seconds. The timer increments the
        // secondsElapsed variable and updates the text of the timerLabel with the current time in
        // seconds if the game is not paused.
        public TetrisPanel(JLabel timerLabel) {
            grid = new Color[ROWS][COLUMNS];
            initializeGrid();
            setPreferredSize(new Dimension(COLUMNS * CELL_SIZE, ROWS * CELL_SIZE));

            gameTimer = new Timer(1000, new ActionListener() {
                private int secondsElapsed = 0;

                @Override
                public void actionPerformed(ActionEvent e) {
                    if (!isPaused) {
                        secondsElapsed++;
                        timerLabel.setText("Time: " + secondsElapsed + "s");
                    }
                }
            });
           // The code is starting a game timer.
            gameTimer.start();

            // The above code is adding a key listener to a component in Java. When a key is pressed,
            // the `handleKeyPress` method is called with the `KeyEvent` as a parameter.
            addKeyListener(new KeyAdapter() {
                @Override
                public void keyPressed(KeyEvent e) {
                    handleKeyPress(e);
                }
            });
           // The above code is setting the focusable property of a component to true in Java. This
           // allows the component to receive keyboard input and respond to user interactions.
            setFocusable(true);
        }

        /**
         * The `initializeGrid` function sets all elements of a 2D grid to the color white.
         */
        private void initializeGrid() {
            for (int i = 0; i < ROWS; i++) {
                for (int j = 0; j < COLUMNS; j++) {
                    grid[i][j] = Color.WHITE;
                }
            }
        }

        /**
         * This function paints a grid of colored rectangles with gray borders on a Java component.
         * 
         * @param g The parameter `g` in the `paintComponent` method is an instance of the `Graphics`
         * class. It is used for rendering graphics on the component, such as drawing shapes, text, and
         * images. In this code snippet, `g` is used to draw colored rectangles representing a grid of
         */
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            for (int i = 0; i < ROWS; i++) {
                for (int j = 0; j < COLUMNS; j++) {
                    g.setColor(grid[i][j]);
                    g.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    g.setColor(Color.GRAY);
                    g.drawRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }

        // The above code defines a method called `togglePause` that toggles the value of a boolean
        // variable `isPaused`. If `isPaused` is currently `true`, it will be set to `false`, and vice
        // versa.
        public void togglePause() {
            isPaused = !isPaused;
        }

        // The above code is a Java method that returns a boolean value indicating whether a certain
        // condition "isPaused" is true or false.
        public boolean isPaused() {
            return isPaused;
        }

        /**
         * The function `handleKeyPress` responds to key events by displaying a message based on the
         * direction keys pressed.
         * 
         * @param e The parameter `e` in the `handleKeyPress` method is of type `KeyEvent`, which
         * represents a key press event. It contains information about the key that was pressed, such
         * as the key code.
         */
        private void handleKeyPress(KeyEvent e) {
            switch (e.getKeyCode()) {
                case KeyEvent.VK_UP:
                    JOptionPane.showMessageDialog(this, "Up!");
                    break;
                case KeyEvent.VK_DOWN:
                    JOptionPane.showMessageDialog(this, "Down!");
                    break;
                case KeyEvent.VK_LEFT:
                    JOptionPane.showMessageDialog(this, "Left!");
                    break;
                case KeyEvent.VK_RIGHT:
                    JOptionPane.showMessageDialog(this, "Right!");
                    break;
            }
        }

       // The above Java code defines a method `printGrid()` that iterates over a 2D array `grid` and
       // prints out the values in a grid format. It uses nested loops to iterate over the rows and
       // columns of the grid, printing each element followed by a space. After printing all elements
       // in a row, it moves to the next line to print the next row.
        // Method to print the grid values
        public void printGrid() {
            for (int i = 0; i < ROWS; i++) {
                for (int j = 0; j < COLUMNS; j++) {
                    System.out.print(grid[i][j] + " ");
                }
                System.out.println();
            }
        }

       // The above Java code defines a method `modifyGridCell` that takes in the row and column
       // indices of a 2D grid, along with a `Color` object. It checks if the provided row and column
       // indices are within the bounds of the grid (`ROWS` and `COLUMNS`), and if so, it updates the
       // color of the cell at that position in the grid to the specified color.
        // Method to modify a specific cell in the grid
        public void modifyGridCell(int row, int col, Color color) {
            if (row >= 0 && row < ROWS && col >= 0 && col < COLUMNS) {
                grid[row][col] = color;
            }
        }

        // The above Java code defines a method `compareGrid` that takes a 2D array of `Color` objects
        // called `otherGrid` as a parameter. It compares this `otherGrid` with the `grid` array
        // (presumably an instance variable of the class) element by element.
        // Method to compare grids
        public boolean compareGrid(Color[][] otherGrid) {
            if (otherGrid.length != ROWS || otherGrid[0].length != COLUMNS) {
                return false;
            }
            for (int i = 0; i < ROWS; i++) {
                for (int j = 0; j < COLUMNS; j++) {
                    if (!grid[i][j].equals(otherGrid[i][j])) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

   // The above code is a Java program that demonstrates testing functionality for a Tetris game.
    public static void main(String[] args) {
        Project project = new Project(); // Launch the application

        // Access the TetrisPanel for testing
        Project.TetrisPanel tetrisPanel = project.new TetrisPanel(new JLabel("Test Timer Label"));

        // Test 1: Initialize the grid with white color
        System.out.println("Test 1: Initializing the grid");
        boolean gridInitialized = true;
        for (int i = 0; i < TetrisPanel.ROWS; i++) {
            for (int j = 0; j < TetrisPanel.COLUMNS; j++) {
                if (!tetrisPanel.grid[i][j].equals(Color.WHITE)) {
                    gridInitialized = false;
                    break;
                }
            }
        }
        System.out.println("Grid initialized to white: " + (gridInitialized ? "PASS" : "FAIL"));
        tetrisPanel.printGrid();

        // The above Java code snippet is testing the functionality of modifying a specific cell in a
        // Tetris game grid. It sets the testRow and testCol variables to 5, indicating the row and
        // column of the cell to be modified. The code then calls the modifyGridCell method of the
        // tetrisPanel object, passing the testRow, testCol, and Color.RED as arguments to change the
        // color of the specified cell to red.
        // Test 2: Modify a specific cell
        System.out.println("\nTest 2: Modifying a cell");
        int testRow = 5;
        int testCol = 5;
        tetrisPanel.modifyGridCell(testRow, testCol, Color.RED);
        boolean cellModified = tetrisPanel.grid[testRow][testCol].equals(Color.RED);
        System.out.println("Modified cell (" + testRow + "," + testCol + ") to red: " + (cellModified ? "PASS" : "FAIL"));
        tetrisPanel.printGrid();

        // The above code is creating a 2D array called `baseGrid` of type `Color` with dimensions
        // `TetrisPanel.ROWS` by `TetrisPanel.COLUMNS`. It then fills this array with the color white
        // by iterating through each row and column and setting the value at that position to
        // `Color.WHITE`. This is used to create a base grid that is all white for comparison purposes.
        // Test 3: Compare with a base grid (all white)
        System.out.println("\nTest 3: Comparing with a base grid");
        Color[][] baseGrid = new Color[TetrisPanel.ROWS][TetrisPanel.COLUMNS];
        for (int i = 0; i < TetrisPanel.ROWS; i++) {
            for (int j = 0; j < TetrisPanel.COLUMNS; j++) {
                baseGrid[i][j] = Color.WHITE; // Create a base grid filled with white
            }
        }

        // The above Java code is checking if the modified grid in the `tetrisPanel` object is
        // different from the base grid stored in the `baseGrid` variable. It calls the `compareGrid`
        // method on the `tetrisPanel` object to compare the grids. If the grids are different, it sets
        // the `gridsAreDifferent` boolean variable to `true`, otherwise it sets it to `false`.
        // Finally, it prints a message indicating whether the grid is different from the base grid,
        // with "PASS" if they are different and "FAIL" if they are the same.
        // Check if the modified grid is different from the base grid
        boolean gridsAreDifferent = !tetrisPanel.compareGrid(baseGrid);
        System.out.println("Grid is different from base grid: " + (gridsAreDifferent ? "PASS" : "FAIL"));

        // The above Java code is creating a 2D array called `differentGrid` of type `Color` with
        // dimensions specified by `TetrisPanel.ROWS` and `TetrisPanel.COLUMNS`. It then fills this
        // grid with the color `Color.WHITE` by iterating over each row and column and assigning
        // `Color.WHITE` to each element. This code is part of a test case to compare the original grid
        // with a different grid in a Tetris game implementation.
        // Test 4: Compare with a non-identical grid
        System.out.println("\nTest 4: Comparing with a different grid");
        Color[][] differentGrid = new Color[TetrisPanel.ROWS][TetrisPanel.COLUMNS];
        for (int i = 0; i < TetrisPanel.ROWS; i++) {
            for (int j = 0; j < TetrisPanel.COLUMNS; j++) {
                differentGrid[i][j] = Color.WHITE; // Fill with white
            }
        }
       // The above Java code is changing the color of a cell in a 2D grid at position (1, 1) to
       // Color.RED. It then compares this modified grid with another grid using the compareGrid method
       // from the tetrisPanel object. The result of the comparison is stored in the boolean variable
       // gridsAreDifferent2, which is then printed out to the console indicating whether the grids are
       // different or not.
        differentGrid[1][1] = Color.RED; // Change one cell
        boolean gridsAreDifferent2 = !tetrisPanel.compareGrid(differentGrid);
        System.out.println("Grid is different from another grid: " + (gridsAreDifferent2 ? "PASS" : "FAIL"));
    }
}
