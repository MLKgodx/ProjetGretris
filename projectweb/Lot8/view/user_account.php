<?php
/**
 * Page de gestion du compte utilisateur
 * Point d'entrée qui appelle le contrôleur approprié
 */

// Inclusion du contrôleur de compte utilisateur
require_once '../controller/user_account_controller.php';

// Afficher la page de compte utilisateur
displayUserAccount();