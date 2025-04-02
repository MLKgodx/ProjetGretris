<?php
/**
 * Page d'historique des parties
 * Point d'entrée qui appelle le contrôleur approprié
 */

// Script pour ajouter les classes de défilement (sera exécuté avant le rendu de la page)
?>
<script>
    // Ajouter les classes de défilement au chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        document.documentElement.classList.add('scrollable');
        document.body.classList.add('scrollable', 'history-page');
    });
</script>
<?php

// Inclure le contrôleur d'historique des parties
require_once '../controller/game_history_controller.php';

// Afficher l'historique des parties
displayGameHistory();