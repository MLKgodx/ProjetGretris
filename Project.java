import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Project extends JFrame {

    private BackgroundImage backgroundImage;

    public Project() {
        setTitle("Gretris");
        setSize(800, 600);
        setMinimumSize(new Dimension(500, 400));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        // Fond d'écran personnalisé
        backgroundImage = new BackgroundImage();

        // Création du panneau de boutons
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.setOpaque(false); // Fond transparent pour les boutons

        // Bouton pour lancer le jeu
        JButton playButton = new JButton("Guest");
        playButton.setPreferredSize(new Dimension(100, 50));
        playButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Ouvre la fenêtre de jeu
                openGameWindow();
            }
        });

        // Autres boutons de l'interface principale
        JButton loginButton = new JButton("Login");
        loginButton.setPreferredSize(new Dimension(100, 50));
        loginButton.addActionListener(e -> JOptionPane.showMessageDialog(null, "Login!"));

        JButton quitButton = new JButton("Quit");
        quitButton.setPreferredSize(new Dimension(100, 50));
        quitButton.addActionListener(e -> System.exit(0));

        JButton registrationButton = new JButton("Registration");
        registrationButton.setPreferredSize(new Dimension(120, 50));
        registrationButton.addActionListener(e -> JOptionPane.showMessageDialog(null, "Registration!"));

        // Ajout des boutons au panneau de boutons
        buttonPanel.add(playButton);
        buttonPanel.add(loginButton);
        buttonPanel.add(quitButton);
        buttonPanel.add(registrationButton);

        // Ajout du fond et du panneau de boutons à la fenêtre principale
        add(backgroundImage, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        setVisible(true);
    }

    private void openGameWindow() {
        JFrame gameFrame = new JFrame("Tetris Game");
        TetrisPanel tetrisPanel = new TetrisPanel();
        gameFrame.add(tetrisPanel);
        gameFrame.pack();
        gameFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        gameFrame.setLocationRelativeTo(null);
        gameFrame.setVisible(true);
    }

    class BackgroundImage extends JComponent {
        private Image image;

        public BackgroundImage() {
            image = new ImageIcon("./src/Gretris_Tetris_Wallpaper.png").getImage();
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            g.drawImage(image, 0, 0, getWidth(), getHeight(), this);
        }

        @Override
        public Dimension getMinimumSize() {
            return new Dimension(400, 300);
        }
    }

    public static void main(String[] args) {
        new Project(); // Lancement de l'interface principale
    }
}
