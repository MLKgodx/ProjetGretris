<?php
// Include essential files
require 'db_connection.php';

session_start();

// Initialize variables and error messages
$username = $email = $password = $confirm_password = "";
$username_err = $email_err = $password_err = $confirm_password_err = "";

// Process form when it's submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get input values
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);

    // Validate username
    if (empty($username)) {
        $username_err = "Veuillez entrer un nom d'utilisateur.";
    } else {
        // Check if username already exists
        $stmt = $pdo->prepare("SELECT PlayerID FROM Player WHERE Username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $username_err = "Ce nom d'utilisateur est deja pris.";
        }
    }

    // Validate email
    if (empty($email)) {
        $email_err = "Veuillez entrer une adresse email.";
    } else {
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT PlayerID FROM Player WHERE Email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $email_err = "Cette adresse email est deja enregistree.";
        }
    }

    // Validate password
    if (empty($password)) {
        $password_err = "Veuillez entrer un mot de passe.";
    } elseif (strlen($password) < 6) {
        $password_err = "Le mot de passe doit contenir au moins 6 caracteres.";
    }

    // Validate confirm password
    if (empty($confirm_password)) {
        $confirm_password_err = "Veuillez confirmer votre mot de passe.";
    } else {
        if ($password != $confirm_password) {
            $confirm_password_err = "Les mots de passe ne correspondent pas.";
        }
    }

    // If no errors, proceed with inserting the new user
    if (empty($username_err) && empty($email_err) && empty($password_err) && empty($confirm_password_err)) {
        // Hash the password before storing it
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert the new user into the Player table
        $sql = "INSERT INTO Player (Username, Email, Password) VALUES (:username, :email, :password)";
        if ($stmt = $pdo->prepare($sql)) {
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashed_password);

            if ($stmt->execute()) {
                // Redirect to login page after successful registration
                header("Location: ../view/login.php");
                exit();
            } else {
                echo "Une erreur est survenue. Veuillez reessayer plus tard.";
            }
            unset($stmt);
        }
    }
}