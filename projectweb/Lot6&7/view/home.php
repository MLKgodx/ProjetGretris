<?php
// Démarrer la session si elle n'est pas déjà démarrée
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>

<body>
    <?php include_once "../view/header.php"; ?>
    <?php if (isset($_SESSION['Username'])): // Vérifie si l'utilisateur est connecté ?>
    <?php else: // L'utilisateur n'est pas connecté ?>
        <div class="button-container">
            <button onclick="window.location.href='guest.php';">Invité</button>
            <button onclick="window.location.href='../view/login.php';">Connexion</button>
            <button onclick="window.location.href='../view/registration.php';">Inscription</button>
        </div>
    <?php endif; ?>

    <div class="button-container">
        <?php if (isset($_SESSION['Username'])): // Vérifie si l'utilisateur est connecté ?>
            <!-- Bouton Play redirige vers guest.php -->
            <button onclick="window.location.href='../view/grid.php';">Jouer</button>
            <!-- Bouton de déconnexion -->
            <button onclick="window.location.href='../controller/logout.php';">Déconnexion</button>
        <?php endif; ?>
    </div>
    <?php include_once "../view/footer.php"; ?>
</body>