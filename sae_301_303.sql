-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 01 jan. 2026 à 23:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sae_301_303`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles_commande`
--

CREATE TABLE `articles_commande` (
  `id` int(11) NOT NULL,
  `commande_id` int(11) NOT NULL,
  `nom_article` varchar(255) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles_commande`
--

INSERT INTO `articles_commande` (`id`, `commande_id`, `nom_article`, `quantite`, `prix_unitaire`, `id_user`) VALUES
(1, 1, 'Saumon Original', 1, 12.50, 0),
(2, 1, 'Master Mix', 1, 15.90, 0),
(3, 1, 'California Dream', 1, 19.90, 0),
(4, 2, 'Tasty Blend', 1, 12.50, 0),
(5, 2, 'Salmon Lovers', 1, 15.90, 0),
(6, 2, 'Sunrise', 1, 15.90, 0),
(7, 3, 'Tasty Blend', 1, 12.50, 2),
(8, 3, 'Salmon Classic', 1, 15.90, 2),
(9, 3, 'Sando Box Salmon Aburi', 1, 15.90, 2),
(10, 3, 'Gourmet Mix', 1, 24.50, 2),
(11, 4, 'Tasty Blend', 1, 12.50, 3),
(12, 4, 'Saumon Original', 1, 12.50, 3),
(13, 4, 'Master Mix', 1, 15.90, 3),
(14, 4, 'Super Salmon', 1, 19.90, 3),
(15, 5, 'Tasty Blend', 1, 12.50, 3),
(16, 5, 'Amateur Mix', 1, 15.90, 3),
(17, 5, 'Saumon Original', 1, 12.50, 3),
(18, 5, 'Salmon Classic', 1, 15.90, 3),
(19, 5, 'Sunrise', 1, 15.90, 3),
(20, 6, 'Tasty Blend', 1, 12.50, 6),
(21, 6, 'Salmon Lovers', 1, 15.90, 6),
(22, 6, 'Salmon Classic', 1, 15.90, 6),
(23, 7, 'Tasty Blend', 1, 12.50, 7),
(24, 7, 'Salmon Lovers', 1, 15.90, 7),
(25, 7, 'Super Salmon', 1, 19.90, 7),
(26, 8, 'Tasty Blend', 6, 12.50, 11),
(27, 8, 'Saumon Original', 1, 12.50, 11),
(28, 8, 'Master Mix', 1, 15.90, 11),
(29, 9, 'Master Mix', 1, 15.90, 11),
(30, 9, 'Sunrise', 1, 15.90, 11),
(31, 9, 'Sando Box Salmon Aburi', 1, 15.90, 11),
(32, 10, 'Tasty Blend', 1, 12.50, 11),
(33, 10, 'Amateur Mix', 1, 15.90, 11),
(34, 10, 'Salmon Classic', 1, 15.90, 11),
(35, 10, 'Sunrise', 1, 15.90, 11),
(37, 12, 'Amateur Mix', 4, 15.90, 13),
(38, 13, 'Saumon Original', 4, 12.50, 12),
(39, 14, 'Amateur Mix', 3, 15.90, 12),
(40, 14, 'Salmon Lovers', 4, 15.90, 12),
(41, 15, 'Amateur Mix', 4, 15.90, 12),
(42, 15, 'Master Mix', 8, 15.90, 12),
(43, 16, 'Amateur Mix', 15, 15.90, 12),
(44, 17, 'Master Mix', 2, 15.90, 12),
(45, 17, 'Sunrise', 1, 15.90, 12),
(46, 17, 'Salmon Classic', 1, 15.90, 12),
(47, 17, 'Sando Box Chicken Katsu', 1, 15.90, 12),
(48, 17, 'Super Salmon', 1, 19.90, 12),
(49, 18, 'Amateur Mix', 1, 15.90, 12),
(50, 18, 'Saumon Original', 4, 12.50, 12),
(51, 18, 'Salmon Lovers', 6, 15.90, 12);

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `date_commande` datetime NOT NULL,
  `montant_total` decimal(10,2) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `date_commande`, `montant_total`, `id_user`) VALUES
(1, '2025-12-11 17:32:21', 48.30, 0),
(2, '2025-12-11 17:33:44', 44.30, 0),
(3, '2025-12-11 17:45:28', 68.80, 2),
(4, '2025-12-16 08:42:48', 60.80, 3),
(5, '2025-12-16 08:43:23', 72.70, 3),
(6, '2025-12-16 09:05:20', 44.30, 6),
(7, '2025-12-16 09:12:01', 48.30, 7),
(8, '2025-12-18 09:14:04', 103.40, 11),
(9, '2025-12-18 09:42:31', 47.70, 11),
(10, '2025-12-18 09:44:56', 60.20, 11),
(12, '2025-12-28 16:29:13', 63.60, 13),
(13, '2025-12-29 22:41:13', 50.00, 12),
(14, '2025-12-29 22:43:44', 111.30, 12),
(15, '2025-12-29 22:45:35', 190.80, 12),
(16, '2025-12-29 22:49:31', 238.50, 12),
(17, '2025-12-29 22:53:36', 99.40, 12),
(18, '2025-12-29 23:18:44', 161.30, 12);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `api_token` varchar(255) DEFAULT NULL,
  `type_compte` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles_commande`
--
ALTER TABLE `articles_commande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commande_id` (`commande_id`),
  ADD KEY `fk_user_article` (`id_user`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`id_user`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles_commande`
--
ALTER TABLE `articles_commande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
