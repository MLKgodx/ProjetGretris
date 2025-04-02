<?php
session_start();
if (!isset($_SESSION['Username'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gretris</title>
    <link rel="stylesheet" href="../CSS/main.css">
    <link href="https://fonts.cdnfonts.com/css/minecraft-4" rel="stylesheet">

    <!-- Script de compatibilité pour exposer les fonctions au contexte global -->
    <script type="module" src="../JS/legacy-bridge.js"></script>
    <!-- Script principal du jeu -->
    <script type="module" src="../JS/main.js"></script>
</head>

<body>
    <div class="main-content">
        <div class="game-container">
            <div id="grid"></div>

            <div class="side-panel">
                <div class="player-info">
                    <span class="player-label">Joueur :</span>
                    <span class="player-value"><?php echo htmlspecialchars($_SESSION['Username']); ?></span>
                </div>
                <div class="stats-container">
                    <div class="stat-item">
                        <span class="stat-label">Temps :</span>
                        <span class="stat-value" id="timer">00:00</span>
                    </div>

                    <div class="stat-item">
                        <span class="stat-label">Score :</span>
                        <span class="stat-value" id="score">0</span>
                    </div>

                    <div class="stat-item">
                        <span class="stat-label">Meilleur Score :</span>
                        <span class="stat-value" id="bestScore">0</span>
                    </div>
                </div>

                <button id="pauseButton" class="control-btn">Pause</button>
            </div>
        </div>

        <div class="game-over-overlay" id="gameOverOverlay">
            <div class="game-over-content">
                <h2>Game Over!</h2>
                <p>Score final : <span id="finalScore">0</span></p>
                <p>Temps de jeu : <span id="finalTime">00:00</span></p>
                <div class="button-container">
                    <button id="restartButton" class="menu-button">Rejouer</button>
                    <button id="homeButton" class="menu-button">Accueil</button>
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        // Importer les fonctions nécessaires
        import { startNewGame } from '../JS/init.js';
        import { togglePause } from '../JS/game-loop.js';
        import { restartGame } from '../JS/init.js';

        // Initialiser le jeu au chargement de la page
        window.addEventListener('load', () => {
            startNewGame();

            // Ajouter les gestionnaires d'événements
            document.getElementById('pauseButton').addEventListener('click', togglePause);
            document.getElementById('restartButton').addEventListener('click', restartGame);
            document.getElementById('homeButton').addEventListener('click', () => {
                window.location.href = 'home.php';
            });
        });
    </script>
</body>

</html>