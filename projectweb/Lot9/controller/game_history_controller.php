<?php
/**
 * Contrôleur pour la gestion de l'historique des parties
 * Fait le lien entre les modèles et les vues
 */

// Inclusion des modèles nécessaires
require_once '../model/db_connection.php';
require_once '../model/game_history.php';

/**
 * Affiche la page d'historique des parties d'un joueur
 * Vérifie d'abord que l'utilisateur est connecté
 */
function displayGameHistory()
{
    session_start();

    // Vérifier si l'utilisateur est connecté
    if (!isset($_SESSION['PlayerID'])) {
        header("Location: ../view/login.php");
        exit();
    }

    // Récupérer les données du joueur depuis la session
    $playerID = $_SESSION['PlayerID'];
    $username = $_SESSION['Username'];

    // Récupérer l'historique des parties du joueur
    $games = getPlayerGameHistory($GLOBALS['pdo'], $playerID);
    $bestScore = getPlayerBestScore($GLOBALS['pdo'], $playerID);

    // Calculer les statistiques
    $stats = calculateGameStatistics($games);

    // Formater les données temporelles pour l'affichage
    $stats['totalTimeFormatted'] = formatTime($stats['totalTimePlayed']);
    $stats['avgTimeFormatted'] = formatTime($stats['avgTimePerGame']);

    // Ajoutez cette ligne avant l'inclusion de la vue dans displayGameHistory()
    $bestGameID = findBestGame($games);

    // Afficher la vue avec les données récupérées
    include '../view/game_history_view.php';
}

/**
 * Identifie la meilleure partie en fonction de plusieurs critères
 * 
 * @param array $games Liste des parties
 * @return int|null ID de la meilleure partie, ou null si aucune partie
 */
function findBestGame($games)
{
    if (empty($games)) {
        return null;
    }

    $bestGameID = null;
    $bestScore = -1;
    $bestLines = -1;
    $bestPieces = -1;

    foreach ($games as $game) {
        $score = isset($game['Points']) ? intval($game['Points']) : 0;
        $lines = isset($game['LinesCleared']) ? intval($game['LinesCleared']) : 0;
        $pieces = isset($game['PiecesDropped']) ? intval($game['PiecesDropped']) : 0;

        // Vérifie si cette partie est meilleure selon le score
        if ($score > $bestScore) {
            $bestScore = $score;
            $bestLines = $lines;
            $bestPieces = $pieces;
            $bestGameID = $game['GameID'];
        }
        // En cas d'égalité de score, vérifie le nombre de lignes
        elseif ($score == $bestScore && $lines > $bestLines) {
            $bestLines = $lines;
            $bestPieces = $pieces;
            $bestGameID = $game['GameID'];
        }
        // En cas d'égalité de score et de lignes, vérifie le nombre de pièces
        elseif ($score == $bestScore && $lines == $bestLines && $pieces < $bestPieces) {
            $bestPieces = $pieces;
            $bestGameID = $game['GameID'];
        }
    }

    return $bestGameID;
}