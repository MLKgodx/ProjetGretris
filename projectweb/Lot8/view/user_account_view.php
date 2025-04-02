<?php
// Inclusion du header
include_once "../view/header.php";
// Titre de la page
// $pageTitle = "Historique des parties - " . htmlspecialchars($username);
?>

<!-- Ajout du lien vers le fichier CSS specifique -->
<link rel="stylesheet" href="../CSS/account_settings.css">

<div class="main-content">
    <h1 class="account-title">Parametres du compte</h1>

    <?php if (isset($_SESSION['accountMessage'])): ?>
        <div class="message-container <?php echo $_SESSION['accountMessage']['type']; ?>">
            <p><?php echo $_SESSION['accountMessage']['text']; ?></p>
        </div>
        <?php unset($_SESSION['accountMessage']); ?>
    <?php endif; ?>

    <div class="account-container">
        <!-- Informations actuelles -->
        <div class="account-info-panel">
            <h2>INFORMATIONS ACTUELLES</h2>
            <div class="current-info">
                <div class="avatar-display">
                    <?php if ($playerInfo['AvatarID']): ?>
                        <img src="<?php echo htmlspecialchars($playerInfo['ImageUrl']); ?>" 
                             alt="<?php echo htmlspecialchars($playerInfo['AvatarName']); ?>" 
                             class="current-avatar">
                    <?php else: ?>
                        <div class="default-avatar">
                            <span><?php echo strtoupper(substr($_SESSION['Username'], 0, 1)); ?></span>
                        </div>
                    <?php endif; ?>
                </div>
                <div class="user-details">
                    <p><strong>PSEUDO:</strong> <?php echo strtoupper(htmlspecialchars($playerInfo['Username'])); ?></p>
                    <p><strong>EMAIL:</strong> <?php echo strtoupper(htmlspecialchars($playerInfo['Email'])); ?></p>
                    <p><strong>AVATAR:</strong> <?php echo $playerInfo['AvatarName'] ? strtoupper(htmlspecialchars($playerInfo['AvatarName'])) : "AUCUN"; ?></p>
                </div>
            </div>
        </div>

        <!-- Formulaire de mise a jour du pseudo -->
        <div class="account-form-panel">
            <h2>MODIFIER LE PSEUDO</h2>
            <form action="../controller/user_account_controller.php" method="post">
                <input type="hidden" name="action" value="update_username">
                <div class="form-group">
                    <label for="new_username">NOUVEAU PSEUDO:</label>
                    <input type="text" id="new_username" name="new_username" required minlength="3" maxlength="20" 
                           placeholder="Entrez votre nouveau pseudo" value="<?php echo htmlspecialchars($playerInfo['Username']); ?>">
                </div>
                <div class="form-actions">
                    <button type="submit" class="menu-button">METTRE a JOUR</button>
                </div>
            </form>
        </div>

        <!-- Formulaire de mise a jour de l'email -->
        <div class="account-form-panel">
            <h2>MODIFIER L'EMAIL</h2>
            <form action="../controller/user_account_controller.php" method="post">
                <input type="hidden" name="action" value="update_email">
                <div class="form-group">
                    <label for="new_email">NOUVEL EMAIL:</label>
                    <input type="email" id="new_email" name="new_email" required 
                           placeholder="Entrez votre nouvel email" value="<?php echo htmlspecialchars($playerInfo['Email']); ?>">
                </div>
                <div class="form-actions">
                    <button type="submit" class="menu-button">METTRE a JOUR</button>
                </div>
            </form>
        </div>

        <!-- Formulaire de mise a jour du mot de passe -->
        <div class="account-form-panel">
            <h2>MODIFIER LE MOT DE PASSE</h2>
            <form action="../controller/user_account_controller.php" method="post">
                <input type="hidden" name="action" value="update_password">
                <div class="form-group">
                    <label for="current_password">MOT DE PASSE ACTUEL:</label>
                    <input type="password" id="current_password" name="current_password" required
                           placeholder="Entrez votre mot de passe actuel">
                </div>
                <div class="form-group">
                    <label for="new_password">NOUVEAU MOT DE PASSE:</label>
                    <input type="password" id="new_password" name="new_password" required minlength="6"
                           placeholder="Entrez votre nouveau mot de passe">
                </div>
                <div class="form-group">
                    <label for="confirm_password">CONFIRMEZ LE MOT DE PASSE:</label>
                    <input type="password" id="confirm_password" name="confirm_password" required
                           placeholder="Confirmez votre nouveau mot de passe">
                </div>
                <div class="form-actions">
                    <button type="submit" class="menu-button">METTRE a JOUR</button>
                </div>
            </form>
        </div>

        <!-- Selection d'avatar -->
        <div class="account-form-panel avatar-selection-panel">
            <h2>CHOISIR UN AVATAR</h2>
            <form action="../controller/user_account_controller.php" method="post">
                <input type="hidden" name="action" value="update_avatar">
                
                <div class="avatar-grid">
                    <?php if (empty($avatars)): ?>
                        <p class="no-avatars-message">AUCUN AVATAR DISPONIBLE POUR LE MOMENT.</p>
                    <?php else: ?>
                        <!-- Option sans avatar -->
                        <div class="avatar-option">
                            <input type="radio" name="avatar_id" id="avatar_none" 
                                   value="" 
                                   <?php echo (empty($playerInfo['AvatarID'])) ? 'checked' : ''; ?>>
                            <label for="avatar_none">
                                <div class="default-avatar" style="width: 80px; height: 80px;">
                                    <span><?php echo strtoupper(substr($_SESSION['Username'], 0, 1)); ?></span>
                                </div>
                                <span>AUCUN</span>
                            </label>
                        </div>
                        
                        <?php foreach ($avatars as $avatar): ?>
                            <div class="avatar-option">
                                <input type="radio" name="avatar_id" id="avatar_<?php echo $avatar['AvatarID']; ?>" 
                                       value="<?php echo $avatar['AvatarID']; ?>" 
                                       <?php echo ($playerInfo['AvatarID'] == $avatar['AvatarID']) ? 'checked' : ''; ?>>
                                <label for="avatar_<?php echo $avatar['AvatarID']; ?>">
                                    <img src="<?php echo htmlspecialchars($avatar['ImageUrl']); ?>" 
                                         alt="<?php echo htmlspecialchars($avatar['AvatarName']); ?>">
                                    <span><?php echo strtoupper(htmlspecialchars($avatar['AvatarName'])); ?></span>
                                </label>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="menu-button">METTRE a JOUR</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Boutons de navigation -->
    <div class="button-container">
        <button class="menu-button" onclick="window.location.href='../view/home.php'">RETOUR a L'ACCUEIL</button>
    </div>
</div>

<?php
// Inclusion du footer
include_once "../view/footer.php";
?>