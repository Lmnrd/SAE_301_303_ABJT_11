-- ============================================================================
-- Migration : Ajout des colonnes telephone et coordonnees_bancaires
-- Exécutez ce script dans phpMyAdmin ou via MySQL
-- ============================================================================

-- Ajouter la colonne telephone
ALTER TABLE `users` 
ADD COLUMN `telephone` VARCHAR(20) DEFAULT NULL AFTER `type_compte`;

-- Ajouter la colonne coordonnees_bancaires (stocke uniquement les 4 derniers chiffres)
ALTER TABLE `users` 
ADD COLUMN `coordonnees_bancaires` VARCHAR(20) DEFAULT NULL AFTER `telephone`;

-- Ajouter la colonne adresse_livraison
ALTER TABLE `users` 
ADD COLUMN `adresse_livraison` VARCHAR(255) DEFAULT NULL AFTER `coordonnees_bancaires`;
