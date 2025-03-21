<?php include_once "../view/header.php"; ?>
<?php require "../model/login.php"; ?>

<div class="login-container">
    <h2>Connectez-vous</h2>
    <form method="POST" action="">
        <label for="login">Pseudo ou Email:</label>
        <input type="text" name="login" id="login" required><br>

        <label for="password">Mot de passe:</label>
        <input type="password" name="password" id="password" required><br>

        <button type="submit">Connexion</button>
        <button type="button" onclick="window.location.href='../view/index.php';">Accueil</button>
    </form>

    <p>Vous n'avez pas de compte ? <a href="../view/registration.php">Créez en un</a>.</p>

    <?php if (isset($_SESSION['invalidInfos']) && $_SESSION['invalidInfos'] === true): ?>
        <p class="error"><?= $_SESSION['errorMessage'] ?></p>
        <?php
        // Reset error message after displaying
        $_SESSION['invalidInfos'] = false;
        unset($_SESSION['errorMessage']);
        ?>
    <?php endif; ?>

</div>

<?php require_once '../view/footer.php'; ?>