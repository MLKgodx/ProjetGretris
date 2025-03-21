<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gretris</title>
    <link rel="stylesheet" href="../CSS/style.css">
</head>

<header>
    <h1>Jeu Gretris</h1>
    <p>Fait par des nuls, pour les nuls !</p>
    <?php if (isset($_SESSION['Username'])): // Vérifie si l'utilisateur est connecté ?>
        <p>Bienvenue à toi, <?php echo htmlspecialchars($_SESSION['Username']); ?> !</p>
    <?php endif; ?>
</header>