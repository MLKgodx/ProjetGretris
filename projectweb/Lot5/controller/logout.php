<?php
session_start(); // Démarrer la session

// Détruire toutes les variables de session
session_unset();

// Détruire la session
session_destroy();

// Rediriger l'utilisateur vers la page d'accueil ou la page de connexion
header("Location: ../view/index.php");
exit();