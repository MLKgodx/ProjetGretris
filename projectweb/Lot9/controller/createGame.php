<?php
session_start();
require_once '../model/db_connection.php';

if (isset($_SESSION['PlayerID'])) {
    try {
        $stmt = $pdo->prepare("INSERT INTO game (PlayerID, StartTime) VALUES (:playerId, NOW())");
        $stmt->execute(['playerId' => $_SESSION['PlayerID']]);
        
        $gameId = $pdo->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'gameId' => $gameId
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'error' => 'Database error'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Not logged in'
    ]);
}