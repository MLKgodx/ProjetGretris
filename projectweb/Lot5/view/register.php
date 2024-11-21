<!-- Registration Form -->
 var
<div class="registration-container">
    <h2>Register a new account</h2>

    <form method="POST" action="">
        <!-- Username -->
        <div class="form-group">
            <label for="username">Username</label>
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
            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>
            <span class="error"><?php echo $password_err; ?></span>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
            <label for="confirm_password">Confirm Password</label>
            <input type="password" name="confirm_password" id="confirm_password" required>
            <span class="error"><?php echo $confirm_password_err; ?></span>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
            <button type="submit">Register</button>
            <button onclick="window.location.href='../view/index.php';">Home</button>
        </div>
    </form>

    <p>Already have an account? <a href="login.php">Login here</a>.</p>
</div>

<?php include '../view/footer.php'; ?>