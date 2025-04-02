<?php include_once "../view/header.php"; ?>
<?php require "../model/login.php"; ?>

<div class="main-content">
    <div class="login-container">
        <h2>Connexion</h2>
        <form method="POST" action="">
            <div class="form-group">
                <input type="text" name="login" id="login" placeholder="Pseudo ou Email" required>
            </div>

            <div class="form-group">
                <input type="password" name="password" id="password" placeholder="Mot de passe" required>
            </div>

            <div class="button-container">
                <button type="submit" class="menu-button">Se connecter</button>
                <button type="button" class="menu-button" onclick="window.location.href='../view/index.php';">Retour</button>
            </div>
        </form>

        <p style="text-align: center; margin-top: 1rem;">
            Pas de compte ? <a href="../view/registration.php" style="color: var(--soul-blue);">Inscrivez-vous</a>
        </p>

        <?php if (isset($_SESSION['invalidInfos']) && $_SESSION['invalidInfos'] === true): ?>
            <p class="error-message"><?= $_SESSION['errorMessage'] ?></p>
            <?php
            $_SESSION['invalidInfos'] = false;
            unset($_SESSION['errorMessage']);
            ?>
        <?php endif; ?>
    </div>
</div>

<?php require_once '../view/footer.php'; ?>