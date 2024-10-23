-- Insertion de données fictives dans la table `avatar`
INSERT INTO `avatar` (`AvatarName`, `ImageUrl`)
VALUES 
('PlayerOneAvatar', 'https://example.com/avatars/avatar1.png'),
('PlayerTwoAvatar', 'https://example.com/avatars/avatar2.png'),
('PlayerThreeAvatar', 'https://example.com/avatars/avatar3.png');

-- Insertion de données fictives dans la table `player`
INSERT INTO `player` (`Username`, `Email`, `Password`, `LoginAttemps`, `TimeOut`, `AvatarID`, `LastLogin`)
VALUES 
('PlayerOne', 'player1@example.com', 'password123', 1, 0, 1, '2024-10-22 08:00:00'),
('PlayerTwo', 'player2@example.com', 'password456', 2, 1, 2, '2024-10-21 09:15:00'),
('PlayerThree', 'player3@example.com', 'password789', 0, 0, 3, NULL);

-- Insertion de données fictives dans la table `game`
INSERT INTO `game` (`PlayerID`, `StartTime`, `EndTime`)
VALUES 
(1, '2024-10-22 08:10:00', '00:20:00'),
(2, '2024-10-21 09:30:00', '00:15:00'),
(3, '2024-10-21 10:00:00', '00:25:00');

-- Insertion de données fictives dans la table `score`
INSERT INTO `score` (`GameID`, `LinesCleared`, `PiecesDropped`, `Points`, `Level`)
VALUES 
(1, 15, 50, 1200, 3),
(2, 20, 60, 1500, 4),
(3, 30, 75, 2000, 5);
