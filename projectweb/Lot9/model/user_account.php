<?php
/**
 * Modèle pour la gestion du compte utilisateur
 * Contient les fonctions d'accès et modification des données utilisateur
 */

/**
 * Récupère les informations du joueur par son ID
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @return array|false Informations du joueur ou false si non trouvé
 */
function getPlayerById($pdo, $playerID) {
    $stmt = $pdo->prepare("
        SELECT 
            p.PlayerID, 
            p.Username, 
            p.Email, 
            p.AvatarID,
            a.AvatarName,
            a.ImageUrl
        FROM 
            player p
        LEFT JOIN 
            avatar a ON p.AvatarID = a.AvatarID
        WHERE 
            p.PlayerID = :playerID
    ");
    $stmt->bindParam(':playerID', $playerID);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

/**
 * Récupère tous les avatars disponibles
 * 
 * @param PDO $pdo Connexion à la base de données
 * @return array Liste des avatars disponibles
 */
function getAllAvatars($pdo) {
    $stmt = $pdo->query("SELECT AvatarID, AvatarName, ImageUrl FROM avatar ORDER BY AvatarName");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Met à jour le pseudo d'un utilisateur
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @param string $newUsername Nouveau pseudo
 * @return bool Succès de l'opération
 */
function updateUsername($pdo, $playerID, $newUsername) {
    // Vérifier si le pseudo existe déjà
    $checkStmt = $pdo->prepare("SELECT PlayerID FROM player WHERE Username = :username AND PlayerID != :playerID");
    $checkStmt->bindParam(':username', $newUsername);
    $checkStmt->bindParam(':playerID', $playerID);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() > 0) {
        return false; // Le pseudo existe déjà
    }
    
    $stmt = $pdo->prepare("UPDATE player SET Username = :username WHERE PlayerID = :playerID");
    $stmt->bindParam(':username', $newUsername);
    $stmt->bindParam(':playerID', $playerID);
    
    if ($stmt->execute()) {
        // Mettre à jour la session
        $_SESSION['Username'] = $newUsername;
        return true;
    }
    
    return false;
}

/**
 * Met à jour l'email d'un utilisateur
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @param string $newEmail Nouvel email
 * @return bool Succès de l'opération
 */
function updateEmail($pdo, $playerID, $newEmail) {
    // Vérifier si l'email existe déjà
    $checkStmt = $pdo->prepare("SELECT PlayerID FROM player WHERE Email = :email AND PlayerID != :playerID");
    $checkStmt->bindParam(':email', $newEmail);
    $checkStmt->bindParam(':playerID', $playerID);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() > 0) {
        return false; // L'email existe déjà
    }
    
    $stmt = $pdo->prepare("UPDATE player SET Email = :email WHERE PlayerID = :playerID");
    $stmt->bindParam(':email', $newEmail);
    $stmt->bindParam(':playerID', $playerID);
    
    return $stmt->execute();
}

/**
 * Met à jour le mot de passe d'un utilisateur
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @param string $currentPassword Mot de passe actuel
 * @param string $newPassword Nouveau mot de passe
 * @return bool|string Succès de l'opération ou message d'erreur
 */
function updatePassword($pdo, $playerID, $currentPassword, $newPassword) {
    // Vérifier le mot de passe actuel
    $checkStmt = $pdo->prepare("SELECT Password FROM player WHERE PlayerID = :playerID");
    $checkStmt->bindParam(':playerID', $playerID);
    $checkStmt->execute();
    $user = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user || !password_verify($currentPassword, $user['Password'])) {
        return "Le mot de passe actuel est incorrect.";
    }
    
    // Hasher le nouveau mot de passe
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("UPDATE player SET Password = :password WHERE PlayerID = :playerID");
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':playerID', $playerID);
    
    return $stmt->execute() ? true : "Erreur lors de la mise à jour du mot de passe.";
}

/**
 * Met à jour l'avatar d'un utilisateur
 * Permet également de supprimer l'avatar en passant une valeur vide
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @param int|null $avatarID ID de l'avatar ou null pour supprimer l'avatar
 * @return bool Succès de l'opération
 */
function updateAvatar($pdo, $playerID, $avatarID) {
    // Si l'avatarID est vide, on le met à NULL pour supprimer l'association
    if ($avatarID === '' || $avatarID === 0) {
        $avatarID = null;
    }
    
    $stmt = $pdo->prepare("UPDATE player SET AvatarID = :avatarID WHERE PlayerID = :playerID");
    $stmt->bindParam(':avatarID', $avatarID, PDO::PARAM_INT);
    $stmt->bindParam(':playerID', $playerID);
    
    return $stmt->execute();
}

/**
 * Vérifie si un utilisateur peut modifier son compte
 * (non verrouillé, tentatives de connexion < 3)
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @return bool L'utilisateur peut modifier son compte
 */
function canModifyAccount($pdo, $playerID) {
    $stmt = $pdo->prepare("SELECT TimeOut, LoginAttemps FROM player WHERE PlayerID = :playerID");
    $stmt->bindParam(':playerID', $playerID);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // L'utilisateur peut modifier son compte s'il n'est pas verrouillé
    return !$user['TimeOut'];
}