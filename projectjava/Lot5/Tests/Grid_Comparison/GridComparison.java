package Tests.Grid_Comparison;

import java.util.Arrays;

/**
 * The class GridComparison defines a Java class with constants for the number of rows and columns in a
 * grid.
 */
public class GridComparison {
    private static final int ROWS = 5;
    private static final int COLS = 5;

    
    // These lines of code are declaring and initializing two 2D arrays of Strings named `grid1` and
    // `grid2`. Each array has dimensions specified by the constants `ROWS` and `COLS`, which are both
    // set to 5 in this class.
    private String[][] grid1 = new String[ROWS][COLS];
    private String[][] grid2 = new String[ROWS][COLS];

    // The `public GridComparison() {` constructor in the `GridComparison` class is initializing two 2D
    // arrays of Strings named `grid1` and `grid2` with dimensions specified by the constants `ROWS`
    // and `COLS`. It calls the `initializeGrid` method to fill both grids with empty spaces
    // represented by the string " ". This constructor is called when an instance of the
    // `GridComparison` class is created, ensuring that the grids are initialized with empty spaces
    // before any further operations are performed on them.
    public GridComparison() {
        
        initializeGrid(grid1);
        initializeGrid(grid2);
    }

    /**
     * The `initializeGrid` function fills a 2D array with empty spaces.
     * 
     * @param grid The `grid` parameter is a 2D array of Strings that represents a grid or game board.
     * The method `initializeGrid` initializes this grid by filling each cell with a space character "
     * ".
     */
    private void initializeGrid(String[][] grid) {
        for (int i = 0; i < ROWS; i++) {
            Arrays.fill(grid[i], " "); // Remplir chaque ligne avec des espaces vides
        }
    }

    
    /**
     * This Java function compares two grids element by element and returns true if they are equal,
     * false otherwise.
     * 
     * @return The method `compareGrids` returns a boolean value. It returns `true` if the grids
     * `grid1` and `grid2` are equal, and `false` if they are not equal.
     */
    private boolean compareGrids() {
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                if (!grid1[i][j].equals(grid2[i][j])) {
                    return false; 
                }
            }
        }
        return true; 
    }

   
    /**
     * The function `insertDataInGrid1` inserts the value "X" into the cell at row 2, column 2 of a 2D
     * grid called `grid1`.
     */
    private void insertDataInGrid1() {
        
        grid1[2][2] = "X"; 
    }

    
    /**
     * The `printGrid` function in Java prints a 2D grid with specified rows and columns, separating
     * each cell with vertical bars and each row with a horizontal line.
     * 
     * @param grid A 2D array representing a grid or game board.
     */
    private void printGrid(String[][] grid) {
        for (int i = 0; i < ROWS; i++) {
            System.out.print("| "); 
            for (int j = 0; j < COLS; j++) {
                System.out.print(grid[i][j] + " | "); 
            }
            System.out.println(); 

           
            System.out.println("---------------------");
        }
    }

    
    // The `public static void main(String[] args)` method in Java is the entry point of a Java
    // program. In this specific code snippet, the `main` method creates an instance of the
    // `GridComparison` class named `gc` using the default constructor `GridComparison()`. This
    // constructor initializes two 2D arrays named `grid1` and `grid2` with empty spaces and sets up
    // the initial state of the grids.
    public static void main(String[] args) {
        GridComparison gc = new GridComparison();

        
        // This code snippet is printing the initial state of two grids `grid1` and `grid2` before any
        // modifications are made. Here's a breakdown of what each line does:
        System.out.println("Avant modification :");
        gc.printGrid(gc.grid1);
        System.out.println();  
        System.out.println("---------------------");  
        gc.printGrid(gc.grid2);

       // This code snippet is checking if the grids `grid1` and `grid2` are identical at the beginning
       // of the program. It does this by calling the `compareGrids()` method of the `GridComparison`
       // instance `gc`.
        if (gc.compareGrids()) {
            System.out.println("Les grilles sont identiques au début.");
        } else {
            System.out.println("Les grilles sont différentes au début.");
        }

        
        // The `gc.insertDataInGrid1();` line of code is calling the `insertDataInGrid1` method of the
        // `GridComparison` instance `gc`. This method is responsible for inserting the value "X" into
        // the cell at row 2, column 2 of the 2D grid named `grid1`. By calling this method, the
        // specific cell in `grid1` is updated with the value "X", indicating a modification to the
        // grid.
        gc.insertDataInGrid1();

        
        // This code snippet is performing the following actions:
        System.out.println("\nAprès modification :");
        gc.printGrid(gc.grid1);
        System.out.println();  
        System.out.println("---------------------");  
        gc.printGrid(gc.grid2);

        // This part of the code is checking if the grids `grid1` and `grid2` are identical after a
        // modification has been made to `grid1`. It does this by calling the `compareGrids()` method
        // of the `GridComparison` instance `gc`.
        if (gc.compareGrids()) {
            System.out.println("Les grilles sont identiques après modification.");
        } else {
            System.out.println("Les grilles sont différentes après modification.");
        }
    }
}
