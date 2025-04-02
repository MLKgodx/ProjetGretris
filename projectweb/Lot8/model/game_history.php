<?php
/**
 * Modèle pour la gestion de l'historique des parties
 * Contient les fonctions d'accès aux données concernant l'historique des jeux
 */

/**
 * Récupère l'historique des parties terminées d'un joueur
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @return array Liste des parties terminées avec leurs scores
 */
function getPlayerGameHistory($pdo, $playerID)
{
    $stmt = $pdo->prepare("
        SELECT 
            g.GameID, 
            g.StartTime, 
            g.EndTime, 
            s.Points, 
            s.LinesCleared, 
            s.PiecesDropped,
            TIMESTAMPDIFF(SECOND, g.StartTime, g.EndTime) as GameDuration
        FROM 
            game g
        LEFT JOIN 
            score s ON g.GameID = s.GameID
        WHERE 
            g.PlayerID = :playerID
            AND g.EndTime IS NOT NULL
        ORDER BY 
            g.StartTime DESC
    ");
    $stmt->bindParam(':playerID', $playerID);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Récupère le meilleur score d'un joueur
 * 
 * @param PDO $pdo Connexion à la base de données
 * @param int $playerID ID du joueur
 * @return int Meilleur score du joueur
 */
function getPlayerBestScore($pdo, $playerID)
{
    $stmt = $pdo->prepare("
        SELECT 
            MAX(s.Points) as BestScore
        FROM 
            score s
        JOIN 
            game g ON s.GameID = g.GameID
        WHERE 
            g.PlayerID = :playerID
    ");
    $stmt->bindParam(':playerID', $playerID);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result ? intval($result['BestScore']) : 0;
}

/**
 * Calcule les statistiques globales à partir de l'historique des parties
 * 
 * @param array $games Liste des parties
 * @return array Statistiques calculées
 */
function calculateGameStatistics($games)
{
    $totalGames = count($games);
    $totalPoints = 0;
    $totalLinesCleared = 0;
    $totalPiecesDropped = 0;
    $totalTimePlayed = 0;
    $highScore = 0;

    foreach ($games as $game) {
        $totalPoints += intval($game['Points'] ?? 0);
        $totalLinesCleared += intval($game['LinesCleared'] ?? 0);
        $totalPiecesDropped += intval($game['PiecesDropped'] ?? 0);
        $totalTimePlayed += intval($game['GameDuration'] ?? 0);

        if (isset($game['Points']) && $game['Points'] > $highScore) {
            $highScore = $game['Points'];
        }
    }

    // Calcul des moyennes
    $avgPointsPerGame = $totalGames > 0 ? round($totalPoints / $totalGames, 2) : 0;
    $avgLinesPerGame = $totalGames > 0 ? round($totalLinesCleared / $totalGames, 2) : 0;
    $avgPiecesPerGame = $totalGames > 0 ? round($totalPiecesDropped / $totalGames, 2) : 0;
    $avgTimePerGame = $totalGames > 0 ? round($totalTimePlayed / $totalGames) : 0;

    return [
        'totalGames' => $totalGames,
        'completedGames' => $totalGames, // Toutes les parties sont terminées
        'gamesInProgress' => 0, // Aucune partie en cours affichée
        'totalPoints' => $totalPoints,
        'totalLinesCleared' => $totalLinesCleared,
        'totalPiecesDropped' => $totalPiecesDropped,
        'totalTimePlayed' => $totalTimePlayed,
        'avgPointsPerGame' => $avgPointsPerGame,
        'avgLinesPerGame' => $avgLinesPerGame,
        'avgPiecesPerGame' => $avgPiecesPerGame,
        'avgTimePerGame' => $avgTimePerGame,
        'highScore' => $highScore
    ];
}

/**
 * Formate un temps en secondes en format lisible
 * Version améliorée pour éviter les problèmes de formatage
 * 
 * @param int $seconds Temps en secondes
 * @return string Temps formaté (ex: 1h 30m 45s)
 */
function formatTime($seconds)
{
    // Debug: logger la valeur reçue
    error_log("formatTime a reçu: " . var_export($seconds, true));

    // Vérifier si la durée est valide (numérique et positive)
    if (!is_numeric($seconds) || $seconds < 0) {
        return "00m 00s";
    }

    // Conversion en entier pour s'assurer que c'est bien un nombre
    $seconds = intval($seconds);

    $hours = floor($seconds / 3600);
    $minutes = floor(($seconds % 3600) / 60);
    $secs = $seconds % 60;

    if ($hours > 0) {
        return sprintf("%d h %02d min %02d sec", $hours, $minutes, $secs);
    } else if ($minutes > 0) {
        return sprintf("%d min %02d sec", $minutes, $secs);
    } else {
        return sprintf("%d sec", $secs);
    }
}
/**
 * Formate une date pour l'affichage
 * 
 * @param string $dateString Date à formater
 * @return string Date formatée
 */
function formatDate($dateString)
{
    if (empty($dateString))
        return "-";

    $date = new DateTime($dateString);
    return $date->format('d/m/Y H:i:s');
}