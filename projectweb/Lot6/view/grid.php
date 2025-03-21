<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gretris</title>
    <link rel="stylesheet" href="../CSS/grille.css">
    <script src="../JS/grille.js" defer></script>
</head>

<body>
    <div id="header">
        <div id="timer">00:00</div>
        <div id="score">Score: 0</div>
    </div>
    <div id="grid"></div>
    <div class="button-container">
        <!-- Retry button -->
        <button onclick="window.location.href='../view/grid.php';">Rejouer</button>
        <!-- Home Button -->
        <button onclick="window.location.href='../view/index.php';">Accueil</button>
        <!-- Logout Button -->
        <button onclick="window.location.href='../view/index.php';">Déconnexion</button>
    </div>
</body>

</html>