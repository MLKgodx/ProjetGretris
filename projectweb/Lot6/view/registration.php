<?php require "../model/registration.php"; ?>
<?php include_once "../view/header.php"; ?>

<div class="registration-container">
    <h2>Créez un nouveau compte</h2>

    <form method="POST" action="">
        <!-- Username -->
        <div class="form-group">
            <label for="username">Pseudo</label>
            <input type="text" name="username" id="username" value="<?php echo $username; ?>" required>
            <span class="error"><?php echo $username_err; ?></span>
        </div>

        <!-- Email -->
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="<?php echo $email; ?>" required>
            <span class="error"><?php echo $email_err; ?></span>
        </div>

        <!-- Password -->
        <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" id="password" required>
            <span class="error"><?php echo $password_err; ?></span>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
            <label for="confirm_password">Confirmer le mot de passe</label>
            <input type="password" name="confirm_password" id="confirm_password" required>
            <span class="error"><?php echo $confirm_password_err; ?></span>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
            <button type="submit">Inscription</button>
            <button onclick="window.location.href='../view/index.php';">Accueil</button>
        </div>
    </form>

    <p>Vous avez déjà un compte ? <a href="login.php">Connectez-vous</a>.</p>
</div>

<?php include '../view/footer.php'; ?>