<?php require "../model/registration.php"; ?>
<?php include_once "../view/header.php"; ?>

<div class="main-content">
    <div class="registration-container">
        <h2>Inscription</h2>

        <form method="POST" action="">
            <div class="form-group">
                <input type="text" name="username" id="username" 
                    placeholder="Pseudo" 
                    value="<?php echo htmlspecialchars($username); ?>" required>
                <?php if ($username_err): ?>
                    <span class="error"><?php echo $username_err; ?></span>
                <?php endif; ?>
            </div>

            <div class="form-group">
                <input type="email" name="email" id="email" 
                    placeholder="Email" 
                    value="<?php echo htmlspecialchars($email); ?>" required>
                <?php if ($email_err): ?>
                    <span class="error"><?php echo $email_err; ?></span>
                <?php endif; ?>
            </div>

            <div class="form-group">
                <input type="password" name="password" id="password" 
                    placeholder="Mot de passe" required>
                <?php if ($password_err): ?>
                    <span class="error"><?php echo $password_err; ?></span>
                <?php endif; ?>
            </div>

            <div class="form-group">
                <input type="password" name="confirm_password" id="confirm_password" 
                    placeholder="Confirmer le mot de passe" required>
                <?php if ($confirm_password_err): ?>
                    <span class="error"><?php echo $confirm_password_err; ?></span>
                <?php endif; ?>
            </div>

            <div class="button-container">
                <button type="submit" class="menu-button">S'inscrire</button>
                <button type="button" class="menu-button" 
                    onclick="window.location.href='../view/index.php';">Retour</button>
            </div>
        </form>

        <p style="text-align: center; margin-top: 1rem;">
            Deja inscrit ? <a href="login.php" style="color: var(--soul-blue);">Connectez-vous</a>
        </p>
    </div>
</div>

<?php include '../view/footer.php'; ?>