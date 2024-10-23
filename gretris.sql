-- Create database Gretris --
DROP DATABASE IF EXISTS Gretris;

CREATE DATABASE Gretris;

USE Gretris;

-- Create table Avatar--
CREATE TABLE
     Avatar (
        AvatarID INT AUTO_INCREMENT PRIMARY KEY,
        AvatarName VARCHAR(64) NOT NULL,
        ImageUrl VARCHAR(256));

-- Create table Players --
CREATE TABLE
    Player (
        PlayerID INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(64) NOT NULL,
        Email VARCHAR(128) NOT NULL UNIQUE,
        Password VARCHAR(256) NOT NULL,
        LoginAttemps INT DEFAULT 0,
        TimeOut BOOLEAN DEFAULT FALSE,
        AvatarID INT,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        LastLogin DATETIME DEFAULT NULL);
        

-- Create table Game --
CREATE TABLE
    Game (
        GameID INT AUTO_INCREMENT PRIMARY KEY,
        PlayerID INT,
        StartTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        EndTime TIME);
        

-- Create table Score --
CREATE TABLE
    Score (
        ScoreID INT AUTO_INCREMENT PRIMARY KEY,
        GameID INT,
        LinesCleared INT DEFAULT 0,
        PiecesDropped INT DEFAULT 0,
        Points INT DEFAULT 0,
        Level INT,
        Creation DATETIME DEFAULT CURRENT_TIMESTAMP);

ALTER TABLE game ADD CONSTRAINT fk_player_game FOREIGN KEY (PlayerID) REFERENCES player(PlayerID) ON DELETE CASCADE;

ALTER TABLE score ADD CONSTRAINT fk_game_score FOREIGN KEY (GameID) REFERENCES game(GameID) ON DELETE CASCADE;

ALTER TABLE player ADD CONSTRAINT fk_avatar_game FOREIGN KEY (AvatarID) REFERENCES Avatar (AvatarID);
