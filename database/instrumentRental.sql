-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Czas generowania: 10 Lut 2023, 19:57
-- Wersja serwera: 8.0.32
-- Wersja PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `instrumentRental`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Instrument`
--

CREATE TABLE `Instrument` (
  `IdInstrument` int NOT NULL,
  `Nazwa` varchar(32) NOT NULL,
  `Cena_za_dzien` decimal(15,2) NOT NULL,
  `IdKategoria` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `Instrument`
--

INSERT INTO `Instrument` (`IdInstrument`, `Nazwa`, `Cena_za_dzien`, `IdKategoria`) VALUES
(1, 'Yamaha FG800', '70.00', 1),
(2, 'Stylophone S1', '20.00', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Kategoria`
--

CREATE TABLE `Kategoria` (
  `IdKategoria` int NOT NULL,
  `Nazwa` varchar(32) NOT NULL,
  `CzyElektryczny` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `Kategoria`
--

INSERT INTO `Kategoria` (`IdKategoria`, `Nazwa`, `CzyElektryczny`) VALUES
(1, 'Gitara akustyczna', 0),
(2, 'Stylophone', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Klient`
--

CREATE TABLE `Klient` (
  `IdKlient` int NOT NULL,
  `Imie` varchar(32) NOT NULL,
  `Nazwisko` varchar(32) NOT NULL,
  `PESEL` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `Klient`
--

INSERT INTO `Klient` (`IdKlient`, `Imie`, `Nazwisko`, `PESEL`) VALUES
(1, 'Jan', 'Kowalski', 123123123),
(2, 'Zbigniew', 'Nowak', 987987987);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Uzytkownicy`
--

CREATE TABLE `Uzytkownicy` (
  `IdUzytkownik` int NOT NULL,
  `Login` varchar(32) NOT NULL,
  `Haslo` varchar(32) NOT NULL,
  `email` varchar(40) NOT NULL,
  `IdKlient` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Wypozyczenie`
--

CREATE TABLE `Wypozyczenie` (
  `IdWypozyczenie` int NOT NULL,
  `IdInstrument` int NOT NULL,
  `IdKlient` int NOT NULL,
  `Data_wypozyczenia` date NOT NULL,
  `Data_zwrotu` date NOT NULL,
  `Koszt_przegladu` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `Wypozyczenie`
--

INSERT INTO `Wypozyczenie` (`IdWypozyczenie`, `IdInstrument`, `IdKlient`, `Data_wypozyczenia`, `Data_zwrotu`, `Koszt_przegladu`) VALUES
(1, 1, 2, '2023-02-17', '2023-02-19', '0.00'),
(2, 1, 2, '2023-02-13', '2023-02-16', '0.00'),
(7, 2, 1, '2023-01-30', '2023-01-31', '0.00'),
(10, 1, 1, '2023-01-28', '2023-01-29', '0.00'),
(12, 1, 2, '2023-01-28', '2023-01-29', '0.00'),
(21, 1, 1, '2023-03-28', '2023-03-31', '0.00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `Instrument`
--
ALTER TABLE `Instrument`
  ADD PRIMARY KEY (`IdInstrument`),
  ADD KEY `Instrument_Kategoria` (`IdKategoria`);

--
-- Indeksy dla tabeli `Kategoria`
--
ALTER TABLE `Kategoria`
  ADD PRIMARY KEY (`IdKategoria`);

--
-- Indeksy dla tabeli `Klient`
--
ALTER TABLE `Klient`
  ADD PRIMARY KEY (`IdKlient`);

--
-- Indeksy dla tabeli `Uzytkownicy`
--
ALTER TABLE `Uzytkownicy`
  ADD PRIMARY KEY (`IdUzytkownik`,`Login`,`Haslo`),
  ADD KEY `Uzytkownicy_Klient` (`IdKlient`);

--
-- Indeksy dla tabeli `Wypozyczenie`
--
ALTER TABLE `Wypozyczenie`
  ADD PRIMARY KEY (`IdWypozyczenie`),
  ADD KEY `Zapis_Instrument` (`IdInstrument`),
  ADD KEY `Zapis_Klient` (`IdKlient`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `Instrument`
--
ALTER TABLE `Instrument`
  MODIFY `IdInstrument` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `Kategoria`
--
ALTER TABLE `Kategoria`
  MODIFY `IdKategoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `Klient`
--
ALTER TABLE `Klient`
  MODIFY `IdKlient` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `Uzytkownicy`
--
ALTER TABLE `Uzytkownicy`
  MODIFY `IdUzytkownik` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `Wypozyczenie`
--
ALTER TABLE `Wypozyczenie`
  MODIFY `IdWypozyczenie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `Instrument`
--
ALTER TABLE `Instrument`
  ADD CONSTRAINT `Instrument_Kategoria` FOREIGN KEY (`IdKategoria`) REFERENCES `Kategoria` (`IdKategoria`);

--
-- Ograniczenia dla tabeli `Uzytkownicy`
--
ALTER TABLE `Uzytkownicy`
  ADD CONSTRAINT `Uzytkownicy_Klient` FOREIGN KEY (`IdKlient`) REFERENCES `Klient` (`IdKlient`);

--
-- Ograniczenia dla tabeli `Wypozyczenie`
--
ALTER TABLE `Wypozyczenie`
  ADD CONSTRAINT `Zapis_Instrument` FOREIGN KEY (`IdInstrument`) REFERENCES `Instrument` (`IdInstrument`),
  ADD CONSTRAINT `Zapis_Klient` FOREIGN KEY (`IdKlient`) REFERENCES `Klient` (`IdKlient`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
