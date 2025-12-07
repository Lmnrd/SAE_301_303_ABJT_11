<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php"); // connexion PDO

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['articles']) || !is_array($data['articles'])) {
    echo json_encode(["message" => "Aucun article reçu"]);
    exit;
}

try {
    $pdo->beginTransaction();

    // Calcul du total
    $montant_total = 0;
    foreach ($data['articles'] as $article) {
        $montant_total += $article['quantite'] * $article['prix_unitaire'];
    }

    // Insertion de la commande
    $stmt = $pdo->prepare("INSERT INTO commandes (date_commande, montant_total) VALUES (NOW(), ?)");
    $stmt->execute([$montant_total]);

    $commande_id = $pdo->lastInsertId();

    // Insertion des articles
    $stmt = $pdo->prepare("
        INSERT INTO articles_commande (commande_id, nom_article, quantite, prix_unitaire) 
        VALUES (?, ?, ?, ?)
    ");

    foreach ($data['articles'] as $article) {
        $stmt->execute([
            $commande_id,
            $article['nom_article'],
            $article['quantite'],
            $article['prix_unitaire']
        ]);
    }

    $pdo->commit();

    echo json_encode([
        "message" => "Commande créée avec succès",
        "commande_id" => $commande_id
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode([
        "message" => "Erreur lors de l’enregistrement",
        "erreur" => $e->getMessage()
    ]);
}
