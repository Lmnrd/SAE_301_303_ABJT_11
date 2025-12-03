-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 02 déc. 2025 à 22:17
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
-- Structure de la table `boxes`
--

CREATE TABLE `boxes` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `prix` decimal(10,2) NOT NULL,
  `pieces` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `aliments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`aliments`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `montant_total` decimal(10,2) NOT NULL,
  `quantite_totale` int(11) DEFAULT 0,
  `date_commande` datetime DEFAULT current_timestamp(),
  `adresse_livraison` varchar(255) DEFAULT NULL,
  `code_postal_livraison` varchar(10) DEFAULT NULL,
  `statut` varchar(50) DEFAULT 'en cours',
  `montant_brut` decimal(10,2) DEFAULT NULL,
  `remise_etudiant` decimal(10,2) DEFAULT NULL,
  `remise_speciale` decimal(10,2) DEFAULT NULL,
  `prix_final` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commande_contenu`
--

CREATE TABLE `commande_contenu` (
  `id_commande` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `quantite` int(11) DEFAULT 1,
  `prix_unitaire` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(50) NOT NULL DEFAULT 'paid',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `box_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id_panier` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `montant_total` decimal(10,2) DEFAULT 0.00,
  `quantite_totale` int(11) DEFAULT 0,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier_contenu`
--

CREATE TABLE `panier_contenu` (
  `id_panier` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `quantite` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(11) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `prix` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `image_produit` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `api_token` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `api_token`, `created_at`) VALUES
(2, 'ffqfqfsqf', 'qsfqsfqsfq', 'fqsfqsf@gmail.com', '$2y$10$yaD8ESbxVAvZaPOExcYROOT94cFUFFCxrrHld.KKwAeWtO.Pa/hYK', NULL, '2025-12-01 09:18:33'),
(3, 'abc', 'abc', 'abc@gmail.com', '$2y$10$2uhPSNmkmRHd4Fs8Fdb.2OpZfXqjOo4uZi18PWbJGjOTuwUjLwSqC', 'd1bac9a0a35b007d5c68ca3a61d12fdd3daf7bf2ee82751a886b153b4e3c4b97', '2025-12-01 09:18:57');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `code_postal` varchar(10) DEFAULT NULL,
  `infos_bancaires` varchar(255) DEFAULT NULL,
  `etudiant` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `boxes`
--
ALTER TABLE `boxes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `commande_contenu`
--
ALTER TABLE `commande_contenu`
  ADD PRIMARY KEY (`id_commande`,`id_produit`),
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `box_id` (`box_id`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id_panier`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `panier_contenu`
--
ALTER TABLE `panier_contenu`
  ADD PRIMARY KEY (`id_panier`,`id_produit`),
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `boxes`
--
ALTER TABLE `boxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id_panier` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `commande_contenu`
--
ALTER TABLE `commande_contenu`
  ADD CONSTRAINT `commande_contenu_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`) ON DELETE CASCADE,
  ADD CONSTRAINT `commande_contenu_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`);

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `panier_contenu`
--
ALTER TABLE `panier_contenu`
  ADD CONSTRAINT `panier_contenu_ibfk_1` FOREIGN KEY (`id_panier`) REFERENCES `panier` (`id_panier`) ON DELETE CASCADE,
  ADD CONSTRAINT `panier_contenu_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
