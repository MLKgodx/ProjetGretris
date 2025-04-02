<?php
/**
 * Contrôleur pour la gestion du compte utilisateur
 * Gère les actions et la logique liées aux opérations sur le compte
 */

// Inclure les modèles nécessaires
require_once '../model/db_connection.php';
require_once '../model/user_account.php';

/**
 * Démarrer la session si elle n'est pas déjà active
 */
function startSessionIfNeeded() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
}

/**
 * Affiche la page de compte utilisateur
 */
function displayUserAccount() {
    // Vérifier que l'utilisateur est connecté
    startSessionIfNeeded();
    if (!isset($_SESSION['PlayerID'])) {
        header("Location: ../view/login.php");
        exit();
    }
    
    global $pdo;
    $playerID = $_SESSION['PlayerID'];
    
    // Vérifier si l'utilisateur peut modifier son compte
    $canModify = canModifyAccount($pdo, $playerID);
    if (!$canModify) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Votre compte est verrouille. Vous ne pouvez pas modifier vos informations."
        ];
    }
    
    // Récupérer les informations de l'utilisateur
    $playerInfo = getPlayerById($pdo, $playerID);
    
    // Récupérer la liste des avatars
    $avatars = getAllAvatars($pdo);
    
    // Inclure la vue
    include_once '../view/user_account_view.php';
}

/**
 * Gère les mises à jour du compte utilisateur
 */
function handleAccountUpdate() {
    global $pdo;
    
    startSessionIfNeeded();
    if (!isset($_SESSION['PlayerID'])) {
        header("Location: ../view/login.php");
        exit();
    }
    
    $playerID = $_SESSION['PlayerID'];
    
    // Vérifier si l'utilisateur peut modifier son compte
    if (!canModifyAccount($pdo, $playerID)) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Votre compte est verrouille. Vous ne pouvez pas modifier vos informations."
        ];
        header("Location: ../view/user_account.php");
        exit();
    }
    
    // Déterminer l'action à effectuer
    $action = isset($_POST['action']) ? $_POST['action'] : '';
    
    switch ($action) {
        case 'update_username':
            updateUsernameHandler($pdo, $playerID);
            break;
        
        case 'update_email':
            updateEmailHandler($pdo, $playerID);
            break;
        
        case 'update_password':
            updatePasswordHandler($pdo, $playerID);
            break;
        
        case 'update_avatar':
            updateAvatarHandler($pdo, $playerID);
            break;
        
        default:
            $_SESSION['accountMessage'] = [
                'type' => 'error',
                'text' => "Action non reconnue."
            ];
    }
    
    // Rediriger vers la page de compte utilisateur
    header("Location: ../view/user_account.php");
    exit();
}

/**
 * Gère la mise à jour du pseudo
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 */
function updateUsernameHandler($pdo, $playerID) {
    $newUsername = trim($_POST['new_username'] ?? '');
    
    if (empty($newUsername)) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Le pseudo ne peut pas etre vide."
        ];
        return;
    }
    
    if (updateUsername($pdo, $playerID, $newUsername)) {
        $_SESSION['accountMessage'] = [
            'type' => 'success',
            'text' => "Votre pseudo a ete mis a jour avec succes."
        ];
    } else {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Ce pseudo est deja utilise par un autre joueur."
        ];
    }
}

/**
 * Gère la mise à jour de l'email
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 */
function updateEmailHandler($pdo, $playerID) {
    $newEmail = trim($_POST['new_email'] ?? '');
    
    if (empty($newEmail) || !filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Veuillez entrer une adresse email valide."
        ];
        return;
    }
    
    if (updateEmail($pdo, $playerID, $newEmail)) {
        $_SESSION['accountMessage'] = [
            'type' => 'success',
            'text' => "Votre adresse email a ete mise a jour avec succes."
        ];
    } else {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Cette adresse email est deja utilisee par un autre compte."
        ];
    }
}

/**
 * Gère la mise à jour du mot de passe
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 */
function updatePasswordHandler($pdo, $playerID) {
    $currentPassword = $_POST['current_password'] ?? '';
    $newPassword = $_POST['new_password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    
    if (empty($currentPassword) || empty($newPassword) || empty($confirmPassword)) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Tous les champs de mot de passe sont requis."
        ];
        return;
    }
    
    if ($newPassword !== $confirmPassword) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Le nouveau mot de passe et sa confirmation ne correspondent pas."
        ];
        return;
    }
    
    if (strlen($newPassword) < 6) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Le nouveau mot de passe doit comporter au moins 6 caractères."
        ];
        return;
    }
    
    $result = updatePassword($pdo, $playerID, $currentPassword, $newPassword);
    
    if ($result === true) {
        $_SESSION['accountMessage'] = [
            'type' => 'success',
            'text' => "Votre mot de passe a ete mis à jour avec succes."
        ];
    } else {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => $result
        ];
    }
}

/**
 * Gère la mise à jour de l'avatar
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 */
function updateAvatarHandler($pdo, $playerID) {
    $avatarID = isset($_POST['avatar_id']) ? intval($_POST['avatar_id']) : null;
    
    if ($avatarID === null) {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Veuillez selectionner un avatar."
        ];
        return;
    }
    
    if (updateAvatar($pdo, $playerID, $avatarID)) {
        $_SESSION['accountMessage'] = [
            'type' => 'success',
            'text' => "Votre avatar a ete mis à jour avec succes."
        ];
    } else {
        $_SESSION['accountMessage'] = [
            'type' => 'error',
            'text' => "Erreur lors de la mise à jour de l'avatar."
        ];
    }
}

// Déterminer quelle action effectuer en fonction de la requête
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? '';

if ($requestMethod === 'POST') {
    handleAccountUpdate();
} else {
    displayUserAccount();
}