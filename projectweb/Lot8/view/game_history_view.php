<?php
// Inclusion du header
include_once "../view/header.php";

// Titre de la page
$pageTitle = "Historique des parties - " . htmlspecialchars($username);
?>

<div class="main-content">
    <h1 class="history-title"><?php echo $pageTitle; ?></h1>

    <!-- Statistiques du joueur -->
    <div class="stats-container">
        <div class="stat-item">
            <span class="stat-label">Statistiques Generales</span>
            <div class="player-value">
                <p><strong>Nombre total de parties:</strong> <?php echo $stats['totalGames']; ?></p>
                <p><strong>Temps total de jeu:</strong> <?php echo $stats['totalTimeFormatted']; ?></p>
                <p><strong>Meilleur score:</strong> <?php echo number_format($stats['highScore']); ?> points</p>
            </div>
        </div>

        <div class="stat-item">
            <span class="stat-label">Moyennes par partie</span>
            <div class="player-value">
                <p><strong>Points par partie:</strong> <?php echo number_format($stats['avgPointsPerGame']); ?></p>
                <p><strong>Lignes effacees par partie:</strong> <?php echo $stats['avgLinesPerGame']; ?></p>
                <p><strong>Pieces placees par partie:</strong> <?php echo $stats['avgPiecesPerGame']; ?></p>
                <p><strong>Duree moyenne d'une partie:</strong> <?php echo $stats['avgTimeFormatted']; ?></p>
            </div>
        </div>
    </div>

    <!-- Tableau des parties -->
    <h2 class="history-subtitle">Detail des parties</h2>

    <?php if ($stats['totalGames'] > 0): ?>
        <div style="width: 100%; max-width: 1200px; overflow-x: auto; margin-bottom: 2rem;">
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Numero de partie</th>
                        <th>Date de debut</th>
                        <th>Date de fin</th>
                        <th>Duree</th>
                        <th>Score</th>
                        <th>Lignes</th>
                        <th>Pieces</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $gameCounter = $stats['totalGames']; // Commence a compter depuis le total des parties
                    foreach ($games as $game):
                        // Vérifier si c'est la meilleure partie
                        $isBestGame = ($game['GameID'] == $bestGameID);
                        $rowClass = $isBestGame ? 'best-game' : '';
                        ?>
                        <tr class="<?php echo $rowClass; ?>">
                            <td>
                                Partie #<?php echo $gameCounter--; ?>
                                <?php if ($isBestGame): ?>
                                    <span class="best-score-badge">Meilleure Partie</span>
                                <?php endif; ?>
                            </td>
                            <td><?php echo formatDate($game['StartTime']); ?></td>
                            <td><?php echo formatDate($game['EndTime']); ?></td>
                            <td><span><?php echo formatTime(intval($game['GameDuration'])); ?></span></td>
                            <td><?php echo isset($game['Points']) ? number_format($game['Points']) : '0'; ?></td>
                            <td><?php echo $game['LinesCleared'] ?? '0'; ?></td>
                            <td><?php echo $game['PiecesDropped'] ?? '0'; ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php else: ?>
        <div class="no-games-message">
            <p>Vous n'avez pas encore joue de partie.</p>
            <div class="button-container">
                <button class="menu-button" onclick="window.location.href='../view/game.php'">Commencer une partie</button>
            </div>
        </div>
    <?php endif; ?>

    <!-- Boutons de navigation -->
    <div class="button-container">
        <button class="menu-button" onclick="window.location.href='../view/home.php'">Retour a l'accueil</button>
    </div>
</div>

<?php
// Inclusion du footer
include_once "../view/footer.php";
?>