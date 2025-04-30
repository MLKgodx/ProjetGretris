<?php
// Include essential files
require_once '../model/db_connection.php';

session_start();

// Initialiser les variables de session pour les messages d'erreur
if (!isset($_SESSION['invalidInfos'])) {
    $_SESSION['invalidInfos'] = false;
}
$invalidlogin = ""; // Initialiser la variable d'erreur

// Login form processing
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitize user input to avoid injection and XSS
    $inputLogin = htmlspecialchars(trim($_POST['login']));
    $inputPassword = $_POST['password'];

    // Prepare the query to fetch the user based on username or email
    $stmt = $pdo->prepare("SELECT * FROM Player WHERE Username = :login OR Email = :login");
    $stmt->bindParam(':login', $inputLogin);
    $stmt->execute();

    // Fetch the user from the database
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if the user exists and if the password matches
    if ($user && password_verify($inputPassword, $user['Password'])) {
        if ($user['TimeOut']) {
            $invalidlogin = "Votre compte est verrouille en raison de plusieurs tentatives de connexion echouees.";
        } else {
            // Login successful, set session variables
            $_SESSION['PlayerID'] = $user['PlayerID'];
            $_SESSION['Username'] = $user['Username'];
            $_SESSION['LastLogin'] = $user['LastLogin'];

            // Update LastLogin timestamp
            $updateStmt = $pdo->prepare("UPDATE Player SET LastLogin = NOW() WHERE PlayerID = :playerID");
            $updateStmt->bindParam(':playerID', $user['PlayerID']);
            $updateStmt->execute();

            // Reset login attempts after successful login
            $resetAttempts = $pdo->prepare("UPDATE Player SET LoginAttemps = 0 WHERE PlayerID = :playerID");
            $resetAttempts->bindParam(':playerID', $user['PlayerID']);
            $resetAttempts->execute();

            // Redirect to dashboard after successful login
            header("Location: ../view/home.php");
            exit();
        }
    } else {
        // Invalid login handling
        if ($user) {
            // Increment login attempts
            $incrementAttempts = $pdo->prepare("UPDATE Player SET LoginAttemps = LoginAttemps + 1 WHERE PlayerID = :playerID");
            $incrementAttempts->bindParam(':playerID', $user['PlayerID']);
            $incrementAttempts->execute();

            // Lock the account if login attempts reach 3
            if ($user['LoginAttemps'] + 1 >= 3) {
                $lockAccount = $pdo->prepare("UPDATE Player SET TimeOut = 1 WHERE PlayerID = :playerID");
                $lockAccount->bindParam(':playerID', $user['PlayerID']);
                $lockAccount->execute();
                $_SESSION['invalidInfos'] = true;
                $_SESSION['errorMessage'] = "Votre compte a ete verrouille en raison de plusieurs tentatives de connexion echouees.";
            } else {
                $_SESSION['invalidInfos'] = true;
                $_SESSION['errorMessage'] = "Connexion invalide. Il vous reste " . (3 - ($user['LoginAttemps'] + 1)) . " tentative(s).";
            }
        } else {
            $_SESSION['invalidInfos'] = true;
            $_SESSION['errorMessage'] = "Pseudo/email ou mot de passe invalide.";
        }
        header("Location: ../view/login.php");
        exit();
    }
}