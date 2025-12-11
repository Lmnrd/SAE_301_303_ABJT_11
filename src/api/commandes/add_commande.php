<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$db = new Database();
$pdo = $db->getConnection();

if (!isset($data['articles']) || !is_array($data['articles'])) {
    echo json_encode(["message" => "Aucun article reçu"]);
    exit;
}

try {
    $pdo->beginTransaction();

    $montant_total = 0;
    foreach ($data['articles'] as $article) {
        $montant_total += $article['quantite'] * $article['prix_unitaire'];
    }

    $stmt = $pdo->prepare("INSERT INTO commandes (date_commande, montant_total) VALUES (NOW(), ?)");
    $stmt->execute([$montant_total]);

    $commande_id = $pdo->lastInsertId();

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
