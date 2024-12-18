-- Creation compte utilisateur MySQL joueur

CREATE USER 'PlayerGretris'@'localhost' IDENTIFIED BY '';
GRANT SELECT, INSERT, UPDATE ON gretris.* TO 'PlayerGretris'@'localhost'; 

--Creation compte utilisateur MySQL admin

CREATE USER 'AdminGretris'@'localhost' IDENTIFIED BY '';
GRANT SELECT, INSERT, UPDATE, DELETE ON gretris.* TO 'AdminGretris'@'localhost'; 

-- Mettre à jour un pseudo --
UPDATE `player` SET `Username` = 'Zakeny' WHERE `player`.`PlayerID` = 2;

-- Supprimer un joueur --
DELETE FROM player WHERE PlayerID = 1;

-- Lister les scores -- +
SELECT score.GameID, score.LinesCleared, score.PiecesDropped, score.Points, score.Level
FROM score
JOIN game ON score.GameID = game.GameID
JOIN player ON game.PlayerID = player.PlayerID;

-- Obtenir le temps moyen de jeu par joueur --
SELECT player.Username, AVG(TIMEDIFF(game.EndTime, game.StartTime)) AS AvgGameTime
FROM player
JOIN game ON player.PlayerID = game.PlayerID
GROUP BY player.PlayerID;

-- S'inscrire --
INSERT INTO player (Username, Email, Password, AvatarID)
VALUES ('NewPlayer', 'newplayer@example.com', 'securepassword', 1);

-- Se connecter --
SELECT PlayerID, Username, AvatarID, LoginAttemps, TimeOut
FROM player
WHERE Email = 'newplayer@example.com' AND Password = 'securepassword';

-- Si les informations sont correctes, tu peux mettre à jour la dernière connexion du joueur. --
UPDATE player
SET LastLogin = NOW()
WHERE PlayerID = 1;

-- Commencer une nouvelle partie --
INSERT INTO game (PlayerID, StartTime)
VALUES (1, NOW());

-- Terminer une partie et enregistrer les résultats --
UPDATE game
SET EndTime = '00:25:00'
WHERE GameID = 1;

-- Enregistrer les scores du joueur pour cette partie : --
INSERT INTO score (GameID, LinesCleared, PiecesDropped, Points, Level)
VALUES (1, 30, 75, 2000, 5);

-- Changer d'avatar --
UPDATE player
SET AvatarID = 2
WHERE PlayerID = 1;

-- Vérifier les meilleurs scores personnels --
SELECT score.LinesCleared, score.PiecesDropped, score.Points, score.Level, score.Creation
FROM score
JOIN game ON score.GameID = game.GameID
WHERE game.PlayerID = 1
ORDER BY score.Points DESC;

-- Consulter le nombre de parties jouées et les performances globales --
SELECT COUNT(game.GameID) AS TotalGames, AVG(score.Points) AS AvgPoints, AVG(score.LinesCleared) AS AvgLinesCleared
FROM game
JOIN score ON game.GameID = score.GameID
WHERE game.PlayerID = 1;

-- Réinitialiser son mot de passe --
UPDATE player
SET Password = 'newsecurepassword'
WHERE Email = 'newplayer@example.com';

-- Consulter le classement des meilleurs joueurs --
SELECT player.Username, MAX(score.Points) AS BestScore
FROM score
JOIN game ON score.GameID = game.GameID
JOIN player ON game.PlayerID = player.PlayerID
GROUP BY player.PlayerID
ORDER BY BestScore DESC
LIMIT 10;
