-- Create database Gretris --
DROP DATABASE IF EXISTS Gretris;

CREATE DATABASE Gretris;

USE Gretris;

-- Create table Avatars --
CREATE TABLE
    Avatar (
        AvatarID INT AUTO_INCREMENT PRIMARY KEY,
        AvatarName VARCHAR(50) NOT NULL,
        ImageUrl VARCHAR(255)
    ) ENGINE=InnoDB;  -- spécification explicite du moteur

-- Create table Players --
CREATE TABLE
    Player (
        PlayerID INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(50) NOT NULL,
        Email VARCHAR(100) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        LoginAttemps INT DEFAULT 0,
        TimeOut BOOLEAN DEFAULT FALSE,
        AvatarID INT,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        LastLogin DATETIME DEFAULT NULL,
        FOREIGN KEY (AvatarID) REFERENCES Avatar (AvatarID)
        ON DELETE SET NULL -- Pour éviter des erreurs sur la suppression d'un avatar
    ) ENGINE=InnoDB;  -- spécification explicite du moteur

-- Create table Games --
CREATE TABLE
    Game (
        GameID INT AUTO_INCREMENT PRIMARY KEY,
        PlayerID INT,
        StartTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        EndTime TIME,
        FOREIGN KEY (PlayerID) REFERENCES Player (PlayerID)
        ON DELETE CASCADE -- Suppression en cascade des parties si le joueur est supprimé
    ) ENGINE=InnoDB;  -- spécification explicite du moteur

-- Create table Score --
CREATE TABLE
    Score (
        ScoreID INT AUTO_INCREMENT PRIMARY KEY,
        GameID INT,
        LinesCleared INT DEFAULT 0,
        PiecesDropped INT DEFAULT 0,
        Points INT DEFAULT 0,
        Level INT,
        Creation DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (GameID) REFERENCES Game (GameID)
        ON DELETE CASCADE -- Suppression en cascade des scores si la partie est supprimée
    ) ENGINE=InnoDB;  -- spécification explicite du moteur
