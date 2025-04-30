<?php
session_start();
require_once '../model/db_connection.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['PlayerID']) && isset($data['gameId'])) {
    try {
        $pdo->beginTransaction();

        // Mettre à jour la partie
        $stmt = $pdo->prepare("UPDATE game SET 
            EndTime = NOW()
            WHERE GameID = :gameId AND PlayerID = :playerId");
        $stmt->execute([
            'gameId' => $data['gameId'],
            'playerId' => $_SESSION['PlayerID']
        ]);

        // Insérer le score
        $stmt = $pdo->prepare("INSERT INTO score 
            (GameID, Points, LinesCleared, PiecesDropped) 
            VALUES 
            (:gameId, :points, :linesCleared, :piecesDropped)");
        $stmt->execute([
            'gameId' => $data['gameId'],
            'points' => $data['score'],
            'linesCleared' => $data['linesCleared'],
            'piecesDropped' => $data['piecesDropped']
        ]);

        $pdo->commit();

        echo json_encode([
            'success' => true,
            'message' => 'Score enregistré avec succès'
        ]);
    } catch (PDOException $e) {
        $pdo->rollBack();
        error_log('Erreur SQL: ' . $e->getMessage());
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Données manquantes ou utilisateur non connecté'
    ]);
}