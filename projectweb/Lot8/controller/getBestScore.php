<?php
session_start();
require_once '../model/db_connection.php';

header('Content-Type: application/json');

if (isset($_SESSION['PlayerID'])) {
    try {
        $stmt = $pdo->prepare("SELECT MAX(Points) as bestScore FROM score 
                              JOIN game ON score.GameID = game.GameID 
                              WHERE game.PlayerID = ?");
        $stmt->execute([$_SESSION['PlayerID']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'bestScore' => $result['bestScore'] ?? 0
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'User not logged in'
    ]);
}