<?php
/**
 * Contrôleur de déconnexion
 * Permet de déconnecter l'utilisateur et de détruire sa session
 */

// Démarrer la session
session_start();

// Vider les variables de session
$_SESSION = array();

// Détruire la session
session_destroy();

// Rediriger vers la page d'accueil
header("Location: ../view/login.php");
exit();
