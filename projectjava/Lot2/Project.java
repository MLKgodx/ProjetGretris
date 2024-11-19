import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Project extends JFrame {

    private BackgroundImage backgroundImage; // Class for the background

    public Project(int i) {
        // Configure window
        setTitle("Gretris");
        setSize(800, 600);
        setMinimumSize(new Dimension(500, 400)); // Window minimal size
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout()); // Using BorderLayout for Flexibility

        // Create a background image
        backgroundImage = new BackgroundImage();

        // Create a panel for the buttons
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new FlowLayout()); // Horizontal Button Alignment
        buttonPanel.setOpaque(false); // Make the panel transparent

        // Create a Play as Guest button (classic button)
        JButton playButton = new JButton("Guest");
        playButton.setPreferredSize(new Dimension(100, 50)); // Button size

        playButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Action when clicking the Play as Guest button
                JOptionPane.showMessageDialog(null, "The game begins!");
            }
        });

        // Create a Login button (classic button)
        JButton loginButton = new JButton("Login");
        loginButton.setPreferredSize(new Dimension(100, 50)); // Button size

        loginButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null, "Login!");
            }
        });

        // Create a Quit button (classic button)
        JButton quitButton = new JButton("Quit");
        quitButton.setPreferredSize(new Dimension(100, 50)); // Button size

        quitButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Action when clicking the Quit button
                System.exit(0);
            }
        });

        // Create a Registration button (classic button)
        JButton registrationButton = new JButton("Registration");
        registrationButton.setPreferredSize(new Dimension(120, 50)); // Button size

        registrationButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Action when clicking the Registration button
                JOptionPane.showMessageDialog(null, "Registration!");
            }
        });

        // Add the buttons to the panel
        buttonPanel.add(playButton);
        buttonPanel.add(loginButton);
        buttonPanel.add(quitButton);
        buttonPanel.add(registrationButton);

        // Add components to the window
        add(backgroundImage, BorderLayout.CENTER); // Background in the center
        add(buttonPanel, BorderLayout.SOUTH); // Button panel at the bottom

        // Make the window visible
        setVisible(true);
    }

    // Inner class for the background image
    class BackgroundImage extends JComponent {
        private Image image;

        public BackgroundImage() {
            // Load the image
            image = new ImageIcon("C:/wamp64/www/ProjetJava/ressources/Gretris_Tetris_Wallpaper.png").getImage();
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            // Resize the image
            int width = getWidth();
            int height = getHeight();
            g.drawImage(image, 0, 0, width, height, this); // Draw the resized image
        }

        @Override
        public Dimension getMinimumSize() {
            // Set a minimum size for the background panel
            return new Dimension(400, 300);
        }
    }

    public static void main(String[] args) {
        new Project(300); // Launch the application
    }

}