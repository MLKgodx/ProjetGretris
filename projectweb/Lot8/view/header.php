<!DOCTYPE html>
<html lang="fr" class="scrollable">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gretris</title>
    <link rel="stylesheet" href="../CSS/main.css">
    <link href="https://fonts.cdnfonts.com/css/minecraft-4" rel="stylesheet">
</head>
<body class="scrollable">
    <header>
        <div class="header-container">
            <div class="header-main">
                <h1>GRETRIS</h1>
                <p class="subtitle">Un Tetris fait pour le GRETA, le Gretris !</p>
                
                <!-- Bouton engrenage pour les réglages -->
                <?php if (isset($_SESSION['Username'])): ?>
                <button class="settings-gear" id="settingsGear" aria-label="Paramètres du compte">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                    </svg>
                </button>
                
                <!-- Menu déroulant pour les paramètres -->
                <div class="settings-dropdown" id="settingsDropdown">
                    <a href="../view/user_account.php">Parametres du compte</a>
                </div>
                <?php endif; ?>
            </div>
            
            <?php 
            // Récupérer le nom de la page actuelle
            $current_page = basename($_SERVER['PHP_SELF']);
            
            // Afficher la bannière de bienvenue seulement si on n'est pas sur la page d'historique
            if (isset($_SESSION['Username']) && $current_page != 'game_history.php' && $current_page != 'user_account.php'): 
                ?>
                <div class="user-welcome">
                    <p>Bienvenue, <?php echo htmlspecialchars($_SESSION['Username']); ?> !</p>
                </div>
            <?php endif; ?>
        </div>
    </header>

    <!-- JavaScript pour le menu déroulant -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const settingsGear = document.getElementById('settingsGear');
            const settingsDropdown = document.getElementById('settingsDropdown');
            
            if (settingsGear && settingsDropdown) {
                settingsGear.addEventListener('click', function(event) {
                    event.stopPropagation();
                    settingsDropdown.classList.toggle('show');
                });
                
                // Ferme le menu si l'utilisateur clique en dehors
                document.addEventListener('click', function(event) {
                    if (!settingsGear.contains(event.target) && !settingsDropdown.contains(event.target)) {
                        settingsDropdown.classList.remove('show');
                    }
                });
            }
        });
    </script>