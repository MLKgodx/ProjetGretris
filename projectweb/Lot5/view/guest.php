<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gretris</title>
    <link rel="stylesheet" href="../CSS/grille.css">
</head>

<body>
    <div id="timer">Temps écoulé : 0s</div>
    <div id="grid"></div>
    <div class="button-container">
        <!-- Retry button -->
        <button onclick="window.location.href='../view/grid.php';">Rejouer</button>
        <!-- Home Button -->
        <button onclick="window.location.href='../view/index.php';">Accueil</button>
        <!-- Login Button -->
        <button onclick="window.location.href='../view/login.php';">Connectez-vous</button>
    </div>
    <script src="../JS/grille.js"></script>
</body>

</html>