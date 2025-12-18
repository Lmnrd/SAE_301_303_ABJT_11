-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 18 déc. 2025 à 09:23
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
(28, 8, 'Master Mix', 1, 15.90, 11);

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
(8, '2025-12-18 09:14:04', 103.40, 11);

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
  `api_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `api_token`) VALUES
(11, 'Liam', 'Andouard', 'andouardliam@gmail.com', '$2y$10$rZNEyQ1AG.T/Ai4hl0WU1.mGB0Haafnvulgv2mc0tNiosMVhpbgzW', '2025-12-18 08:13:24', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
