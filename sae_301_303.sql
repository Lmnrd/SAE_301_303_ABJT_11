-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 05 jan. 2026 à 22:12
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
(56, 23, 'Amateur Mix', 2, 15.90, 21),
(57, 23, 'California Dream', 2, 19.90, 21),
(58, 23, 'Sando Box Salmon Aburi', 3, 15.90, 21),
(59, 24, 'Sunrise', 7, 15.90, 22),
(60, 24, 'Fresh Mix', 3, 24.50, 22);

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
(23, '2026-01-05 22:09:20', 117.51, 21),
(24, '2026-01-05 22:10:31', 163.83, 22);

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
  `type_compte` varchar(25) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `coordonnees_bancaires` varchar(20) DEFAULT NULL,
  `adresse_livraison` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `api_token`, `type_compte`, `telephone`, `coordonnees_bancaires`, `adresse_livraison`) VALUES
(21, 'Pierre', 'utilisateur', 'utilisateur@gmail.com', '$2y$10$j.NsLIzzY5nPJ9UpAJBWX.XlgOm6TvMST4zs9evXS3JcIJaZIwJbO', '2026-01-05 21:08:24', NULL, 'normal', '01 23 14 56 78', '4798', '5 Av. de la République, Meaux'),
(22, 'etudiant', 'etudiant', 'etudiant@gmail.com', '$2y$10$wkseoR4ETJFmarBmkzyl0.6H85fX0JeE5dMyHsitOeqdr4jC4HSUy', '2026-01-05 21:09:44', NULL, 'etudiant', '45 78 98 56 56', '4678', 'Rue de Meaux');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
