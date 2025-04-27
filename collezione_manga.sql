-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Apr 27, 2025 alle 11:22
-- Versione del server: 8.4.3
-- Versione PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `collezione manga`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `artista`
--

CREATE TABLE `artista` (
  `ID_Artista` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Data_Nascita` date NOT NULL,
  `Pseudonimo` varchar(255) DEFAULT NULL,
  `Stile_Disegno` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `artista`
--

INSERT INTO `artista` (`ID_Artista`, `Nome`, `Cognome`, `Data_Nascita`, `Pseudonimo`, `Stile_Disegno`) VALUES
(1, 'Takeshi', 'Obata', '1969-02-11', NULL, 'Realistico'),
(2, 'Masashi', 'Kishimoto', '1974-11-08', 'Kishi', 'Stile shōnen classico, con linee pulite e azione fluida'),
(3, 'Noriaki', 'Kubo', '1977-06-26', 'Tite Kubo', 'Pulito ed elegante, design stilizzati'),
(4, 'Eiichiro', 'Oda', '1975-01-01', '', 'Caricaturale, proporzioni distorte ed espressioni esagerate, dinamico');

-- --------------------------------------------------------

--
-- Struttura della tabella `artista_manga`
--

CREATE TABLE `artista_manga` (
  `ID_Artista` int NOT NULL,
  `ID_Manga` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `artista_manga`
--

INSERT INTO `artista_manga` (`ID_Artista`, `ID_Manga`) VALUES
(2, 1),
(1, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `autore`
--

CREATE TABLE `autore` (
  `ID_Autore` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Data_Nascita` date NOT NULL,
  `Pseudonimo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `autore`
--

INSERT INTO `autore` (`ID_Autore`, `Nome`, `Cognome`, `Data_Nascita`, `Pseudonimo`) VALUES
(1, 'Masashi', 'Kishimoto', '1974-11-08', 'Kishi'),
(2, 'Tsugumi', 'Ohba', '1970-08-15', NULL),
(3, 'Noriaki', 'Kubo', '1977-06-26', 'Tite Kubo'),
(4, 'Eiichiro', 'Oda', '1975-01-01', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `autore_manga`
--

CREATE TABLE `autore_manga` (
  `ID_Autore` int NOT NULL,
  `ID_Manga` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `autore_manga`
--

INSERT INTO `autore_manga` (`ID_Autore`, `ID_Manga`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `copertina`
--

CREATE TABLE `copertina` (
  `NomeFile` varchar(255) NOT NULL,
  `Path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/static/copertine',
  `Dimensioni` varchar(11) NOT NULL,
  `Spazio_Occupato_KB` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `copertina`
--

INSERT INTO `copertina` (`NomeFile`, `Path`, `Dimensioni`, `Spazio_Occupato_KB`) VALUES
('Bleach Vol. 1.jpg', '/static/copertine', '311x466', 36.3),
('Bleach Vol. 2.jpg', '/static/copertine', '1400x2100', 285),
('Bleach Vol. 3.jpg', '/static/copertine', '1463x2219', 562),
('Bleach Vol. 4.jpg', '/static/copertine', '682x1000', 82.7),
('Bleach Vol. 5.jpg', '/static/copertine', '676x1000', 97.7),
('Death Note Vol. 1.jpg', '/static/copertine', '667x1000', 125),
('Death Note Vol. 2.jpg', '/static/copertine', '655x1000', 133),
('Death Note Vol. 3.jpg', '/static/copertine', '658x1000', 184),
('Death Note Vol. 4.jpg', '/static/copertine', '1000x1524', 335),
('Death Note Vol. 5.jpg', '/static/copertine', '657x1000', 155),
('Naruto Vol. 1.jpg', '/static/copertine', '682x1092', 165.9),
('Naruto Vol. 10.jpg', '/static/copertine', '682x1092', 156.6),
('Naruto Vol. 2.jpg', '/static/copertine', '682x1092', 177.8),
('Naruto Vol. 3.jpg', '/static/copertine', '682x1092', 161.4),
('Naruto Vol. 4.jpg', '/static/copertine', '682x1092', 168.9),
('Naruto Vol. 5.jpg', '/static/copertine', '682x1092', 182.4),
('Naruto Vol. 6.jpg', '/static/copertine', '682x1092', 161),
('Naruto Vol. 7.jpg', '/static/copertine', '685x1092', 162.3),
('Naruto Vol. 8.jpg', '/static/copertine', '682x1092', 140.8),
('Naruto Vol. 9.jpg', '/static/copertine', '682x1092', 156.9),
('One Piece Vol. 1.jpg', '/static/copertine', '415x635', 67.3),
('One Piece Vol. 2.jpg', '/static/copertine', '647x1000', 118),
('One Piece Vol. 3.jpg', '/static/copertine', '663x1000', 117),
('One Piece Vol. 4.jpg', '/static/copertine', '649x1000', 96.5),
('One Piece Vol. 5.jpg', '/static/copertine', '753x1177', 234);

-- --------------------------------------------------------

--
-- Struttura della tabella `editore`
--

CREATE TABLE `editore` (
  `Cod_Editore` varchar(7) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Data_Fondazione` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `editore`
--

INSERT INTO `editore` (`Cod_Editore`, `Nome`, `Data_Fondazione`) VALUES
('ED001', 'Planet Manga', '1990-04-15'),
('ED002', 'J-Pop', '2001-11-20'),
('ED003', 'Shueisha', '1925-12-03');

-- --------------------------------------------------------

--
-- Struttura della tabella `genere`
--

CREATE TABLE `genere` (
  `ID_Genere` int NOT NULL,
  `Nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `genere`
--

INSERT INTO `genere` (`ID_Genere`, `Nome`) VALUES
(1, 'Shonen'),
(2, 'Seinen'),
(3, 'Shojo');

-- --------------------------------------------------------

--
-- Struttura della tabella `genere_manga`
--

CREATE TABLE `genere_manga` (
  `ID_Manga` int NOT NULL,
  `ID_Genere` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `genere_manga`
--

INSERT INTO `genere_manga` (`ID_Manga`, `ID_Genere`) VALUES
(1, 1),
(3, 1),
(4, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `manga`
--

CREATE TABLE `manga` (
  `ID_Manga` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Edizione` varchar(255) NOT NULL,
  `A_Colori` tinyint(1) NOT NULL,
  `Contenuti_Extra` tinyint(1) NOT NULL,
  `Cod_Editore` varchar(7) NOT NULL,
  `Copertina` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `manga`
--

INSERT INTO `manga` (`ID_Manga`, `Nome`, `Edizione`, `A_Colori`, `Contenuti_Extra`, `Cod_Editore`, `Copertina`) VALUES
(1, 'Naruto', 'Prima Edizione', 0, 1, 'ED001', 'Naruto Vol. 1.jpg'),
(2, 'Death Note', 'Edizione Deluxe', 0, 1, 'ED002', 'Death Note Vol. 1.jpg'),
(3, 'Bleach', 'Prima Edizione', 0, 1, 'ED003', 'Bleach Vol. 1.jpg'),
(4, 'One Piece', 'Prima Edizione', 0, 1, 'ED003', 'One Piece Vol. 1.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `rivenditore`
--

CREATE TABLE `rivenditore` (
  `ID_Rivenditore` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Indirizzo` varchar(255) NOT NULL,
  `Telefono` varchar(14) NOT NULL,
  `Sito_Web` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `rivenditore`
--

INSERT INTO `rivenditore` (`ID_Rivenditore`, `Nome`, `Indirizzo`, `Telefono`, `Sito_Web`) VALUES
(1, 'Libreria Manga World', 'Via delle Rose 42', '3204567890', 'https://www.starshop.it/'),
(2, 'Comics & Manga Store', 'Viale Europa 118', '3471234567', 'https://www.mangacomicsmarket.it/?srsltid=AfmBOop73KyxUFdPBjs08DohdniJF0O43aA7FU7dZZZaaEgJQt7-UdUc'),
(3, 'Anime Shop', 'Piazza San Marco 7', '3899876543', 'https://www.emp-online.it/fan-merch/anime/');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `Nickname` varchar(40) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Data_Nascita` date NOT NULL,
  `Città` int NOT NULL,
  `Regione` smallint NOT NULL,
  `Email` varchar(319) NOT NULL,
  `Password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `AccessoEffettuato` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`Nickname`, `Nome`, `Cognome`, `Data_Nascita`, `Città`, `Regione`, `Email`, `Password`, `AccessoEffettuato`) VALUES
('bbb', 'b', 'b', '2022-02-22', 1016, 12, 'b@b', '$2b$10$AKtb.aXeYZnixD6m2/dxFOJjGnfbiOYsrI.feGyXFi6eSOfH7CXAi', 0),
('mk11', 'Michele', 'Alfano', '2006-05-03', 1001, 1, 'michele.alfano@davincimilazzo.edu.it', '$2b$10$HeqCTMVzA34NLmbaR6DLmO2/mD8m09vPD/WC02FUQlt9IVVftxtvC', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `volume`
--

CREATE TABLE `volume` (
  `ISBN` varchar(17) NOT NULL,
  `Titolo` varchar(255) NOT NULL,
  `N_Pagine` int NOT NULL,
  `N_Volume` int NOT NULL,
  `ID_Manga` int NOT NULL,
  `Copertina` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `volume`
--

INSERT INTO `volume` (`ISBN`, `Titolo`, `N_Pagine`, `N_Volume`, `ID_Manga`, `Copertina`) VALUES
('9784088733775', 'Bleach Vol. 1', 200, 1, 3, 'Bleach Vol. 1.jpg'),
('9784088733782', 'Bleach Vol. 2', 200, 2, 3, 'Bleach Vol. 2.jpg'),
('9784088733799', 'Bleach Vol. 3', 200, 3, 3, 'Bleach Vol. 3.jpg'),
('9784088733805', 'Bleach Vol. 4', 200, 4, 3, 'Bleach Vol. 4.jpg'),
('9784088733812', 'Bleach Vol. 5', 200, 5, 3, 'Bleach Vol. 5.jpg'),
('9784088734010', 'One Piece Vol. 1', 200, 1, 4, 'One Piece Vol. 1.jpg'),
('9784088734027', 'One Piece Vol. 2', 200, 2, 4, 'One Piece Vol. 2.jpg'),
('9784088734034', 'One Piece Vol. 3', 200, 3, 4, 'One Piece Vol. 3.jpg'),
('9784088734041', 'One Piece Vol. 4', 200, 4, 4, 'One Piece Vol. 4.jpg'),
('9784088734058', 'One Piece Vol. 5', 200, 5, 4, 'One Piece Vol. 5.jpg'),
('9788881234567', 'Naruto Vol. 1', 192, 1, 1, 'Naruto Vol. 1.jpg'),
('9788881234568', 'Naruto Vol. 2', 192, 2, 1, 'Naruto Vol. 2.jpg'),
('9788881234569', 'Naruto Vol. 3', 192, 3, 1, 'Naruto Vol. 3.jpg'),
('9788881234570', 'Naruto Vol. 4', 192, 4, 1, 'Naruto Vol. 4.jpg'),
('9788881234571', 'Naruto Vol. 5', 192, 5, 1, 'Naruto Vol. 5.jpg'),
('9788881234572', 'Naruto Vol. 6', 192, 6, 1, 'Naruto Vol. 6.jpg'),
('9788881234573', 'Naruto Vol. 7', 192, 7, 1, 'Naruto Vol. 7.jpg'),
('9788881234574', 'Naruto Vol. 8', 192, 8, 1, 'Naruto Vol. 8.jpg'),
('9788881234575', 'Naruto Vol. 9', 192, 9, 1, 'Naruto Vol. 9.jpg'),
('9788881234576', 'Naruto Vol. 10', 192, 10, 1, 'Naruto Vol. 10.jpg'),
('9788887654321', 'Death Note Vol. 1', 200, 1, 2, 'Death Note Vol. 1.jpg'),
('9788887654322', 'Death Note Vol. 2', 200, 2, 2, 'Death Note Vol. 2.jpg'),
('9788887654323', 'Death Note Vol. 3', 200, 3, 2, 'Death Note Vol. 3.jpg'),
('9788887654324', 'Death Note Vol. 4', 200, 4, 2, 'Death Note Vol. 4.jpg'),
('9788887654325', 'Death Note Vol. 5', 200, 5, 2, 'Death Note Vol. 5.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `volumi_rivenditore`
--

CREATE TABLE `volumi_rivenditore` (
  `ID_Rivenditore` int NOT NULL,
  `ISBN_Volume` varchar(17) NOT NULL,
  `Prezzo` float NOT NULL,
  `Usato` tinyint(1) NOT NULL,
  `Qualità` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `volumi_rivenditore`
--

INSERT INTO `volumi_rivenditore` (`ID_Rivenditore`, `ISBN_Volume`, `Prezzo`, `Usato`, `Qualità`) VALUES
(1, '9788881234567', 15.99, 0, 'Nuovo'),
(2, '9788881234567', 12.99, 1, 'Buono'),
(3, '9788887654321', 17.99, 0, 'Nuovo');

-- --------------------------------------------------------

--
-- Struttura della tabella `volumi_utente`
--

CREATE TABLE `volumi_utente` (
  `Nickname_Utente` varchar(40) NOT NULL,
  `ISBN_Volume` varchar(17) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `volumi_utente`
--

INSERT INTO `volumi_utente` (`Nickname_Utente`, `ISBN_Volume`) VALUES
('mk11', '9788881234569'),
('mk11', '9788881234571'),
('mk11', '9788881234573');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `artista`
--
ALTER TABLE `artista`
  ADD PRIMARY KEY (`ID_Artista`),
  ADD UNIQUE KEY `Pseudonimo` (`Pseudonimo`);

--
-- Indici per le tabelle `artista_manga`
--
ALTER TABLE `artista_manga`
  ADD PRIMARY KEY (`ID_Artista`,`ID_Manga`),
  ADD KEY `ID_Manga` (`ID_Manga`);

--
-- Indici per le tabelle `autore`
--
ALTER TABLE `autore`
  ADD PRIMARY KEY (`ID_Autore`),
  ADD UNIQUE KEY `Pseudonimo` (`Pseudonimo`);

--
-- Indici per le tabelle `autore_manga`
--
ALTER TABLE `autore_manga`
  ADD PRIMARY KEY (`ID_Autore`,`ID_Manga`),
  ADD KEY `ID_Manga` (`ID_Manga`);

--
-- Indici per le tabelle `copertina`
--
ALTER TABLE `copertina`
  ADD PRIMARY KEY (`NomeFile`);

--
-- Indici per le tabelle `editore`
--
ALTER TABLE `editore`
  ADD PRIMARY KEY (`Cod_Editore`);

--
-- Indici per le tabelle `genere`
--
ALTER TABLE `genere`
  ADD PRIMARY KEY (`ID_Genere`);

--
-- Indici per le tabelle `genere_manga`
--
ALTER TABLE `genere_manga`
  ADD PRIMARY KEY (`ID_Manga`,`ID_Genere`),
  ADD KEY `ID_Genere` (`ID_Genere`);

--
-- Indici per le tabelle `manga`
--
ALTER TABLE `manga`
  ADD PRIMARY KEY (`ID_Manga`),
  ADD KEY `Cod_Editore` (`Cod_Editore`),
  ADD KEY `Copertina` (`Copertina`);

--
-- Indici per le tabelle `rivenditore`
--
ALTER TABLE `rivenditore`
  ADD PRIMARY KEY (`ID_Rivenditore`),
  ADD UNIQUE KEY `Nome` (`Nome`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`Nickname`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Regione` (`Regione`),
  ADD KEY `Città` (`Città`);

--
-- Indici per le tabelle `volume`
--
ALTER TABLE `volume`
  ADD PRIMARY KEY (`ISBN`),
  ADD KEY `ID_Manga` (`ID_Manga`),
  ADD KEY `Copertina` (`Copertina`);

--
-- Indici per le tabelle `volumi_rivenditore`
--
ALTER TABLE `volumi_rivenditore`
  ADD PRIMARY KEY (`ID_Rivenditore`,`ISBN_Volume`),
  ADD KEY `ISBN_Volume` (`ISBN_Volume`);

--
-- Indici per le tabelle `volumi_utente`
--
ALTER TABLE `volumi_utente`
  ADD PRIMARY KEY (`Nickname_Utente`,`ISBN_Volume`),
  ADD KEY `ISBN_Volume` (`ISBN_Volume`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `artista`
--
ALTER TABLE `artista`
  MODIFY `ID_Artista` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `autore`
--
ALTER TABLE `autore`
  MODIFY `ID_Autore` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `genere`
--
ALTER TABLE `genere`
  MODIFY `ID_Genere` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `manga`
--
ALTER TABLE `manga`
  MODIFY `ID_Manga` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `rivenditore`
--
ALTER TABLE `rivenditore`
  MODIFY `ID_Rivenditore` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `artista_manga`
--
ALTER TABLE `artista_manga`
  ADD CONSTRAINT `artista_manga_ibfk_1` FOREIGN KEY (`ID_Artista`) REFERENCES `artista` (`ID_Artista`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `artista_manga_ibfk_2` FOREIGN KEY (`ID_Manga`) REFERENCES `manga` (`ID_Manga`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `autore_manga`
--
ALTER TABLE `autore_manga`
  ADD CONSTRAINT `autore_manga_ibfk_1` FOREIGN KEY (`ID_Autore`) REFERENCES `autore` (`ID_Autore`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `autore_manga_ibfk_2` FOREIGN KEY (`ID_Manga`) REFERENCES `manga` (`ID_Manga`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `genere_manga`
--
ALTER TABLE `genere_manga`
  ADD CONSTRAINT `genere_manga_ibfk_1` FOREIGN KEY (`ID_Genere`) REFERENCES `genere` (`ID_Genere`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `genere_manga_ibfk_2` FOREIGN KEY (`ID_Manga`) REFERENCES `manga` (`ID_Manga`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `manga`
--
ALTER TABLE `manga`
  ADD CONSTRAINT `manga_ibfk_1` FOREIGN KEY (`Cod_Editore`) REFERENCES `editore` (`Cod_Editore`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `manga_ibfk_2` FOREIGN KEY (`Copertina`) REFERENCES `copertina` (`NomeFile`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Limiti per la tabella `utente`
--
ALTER TABLE `utente`
  ADD CONSTRAINT `utente_ibfk_1` FOREIGN KEY (`Regione`) REFERENCES `database_comuni`.`italy_regions` (`id_regione`),
  ADD CONSTRAINT `utente_ibfk_2` FOREIGN KEY (`Città`) REFERENCES `database_comuni`.`italy_cities` (`istat`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Limiti per la tabella `volume`
--
ALTER TABLE `volume`
  ADD CONSTRAINT `volume_ibfk_1` FOREIGN KEY (`ID_Manga`) REFERENCES `manga` (`ID_Manga`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volume_ibfk_2` FOREIGN KEY (`Copertina`) REFERENCES `copertina` (`NomeFile`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Limiti per la tabella `volumi_rivenditore`
--
ALTER TABLE `volumi_rivenditore`
  ADD CONSTRAINT `volumi_rivenditore_ibfk_1` FOREIGN KEY (`ID_Rivenditore`) REFERENCES `rivenditore` (`ID_Rivenditore`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volumi_rivenditore_ibfk_2` FOREIGN KEY (`ISBN_Volume`) REFERENCES `volume` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `volumi_utente`
--
ALTER TABLE `volumi_utente`
  ADD CONSTRAINT `volumi_utente_ibfk_1` FOREIGN KEY (`Nickname_Utente`) REFERENCES `utente` (`Nickname`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volumi_utente_ibfk_2` FOREIGN KEY (`ISBN_Volume`) REFERENCES `volume` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
