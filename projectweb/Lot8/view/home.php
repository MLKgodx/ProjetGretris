<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
include_once "../view/header.php";
?>

<div class="main-content">
    <div class="button-container">
        <?php if (!isset($_SESSION['Username'])): ?>
            <button class="menu-button" onclick="window.location.href='game.php';">Mode Invite</button>
            <button class="menu-button" onclick="window.location.href='login.php';">Connexion</button>
            <button class="menu-button" onclick="window.location.href='registration.php';">Inscription</button>
        <?php else: ?>
            <button class="menu-button" onclick="window.location.href='game.php';">Jouer</button>
            <button class="menu-button" onclick="window.location.href='game_history.php';">Historique</button>
            <button class="menu-button" onclick="window.location.href='../controller/logout.php';">Deconnexion</button>
        <?php endif; ?>
    </div>
</div>

<?php include_once "../view/footer.php"; ?>