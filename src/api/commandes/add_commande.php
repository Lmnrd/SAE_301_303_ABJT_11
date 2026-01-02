// fichier PHP qui permet d'ajouter une commande dans la base de données

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

if (!isset($data['id_user']) || empty($data['id_user'])) {
    http_response_code(400);
    echo json_encode(["message" => "ID utilisateur manquant"]);
    exit;
}

try {
    $pdo->beginTransaction();

    $montant_total = 0;
    foreach ($data['articles'] as $article) {
        $montant_total += (float)$article['quantite'] * (float)$article['prix_unitaire'];
    }

    // récupérer le type de compte de l'utilisateur pour les remises
    $stmtUser = $pdo->prepare("SELECT type_compte FROM users WHERE id = ?");
    $stmtUser->execute([(int)$data['id_user']]);
    $user = $stmtUser->fetch(PDO::FETCH_ASSOC);
    $isEtudiant = ($user && $user['type_compte'] === 'etudiant');

    // remise de 1.5% si > 50€
    if ($montant_total >= 50) {
        $remiseSomme = $montant_total * 0.015;
        $montant_total -= $remiseSomme;
    }

    // remise étudiant (10%)
    if ($isEtudiant) {
        $remiseEtudiant = $montant_total * 0.10;
        $montant_total -= $remiseEtudiant;
    }

    $stmt = $pdo->prepare("INSERT INTO commandes (date_commande, montant_total, id_user) VALUES (NOW(), ?, ?)");
    if (!$stmt->execute([$montant_total, (int)$data['id_user']])) {
        throw new Exception("Erreur lors de l'insertion dans la table commandes");
    }

    $commande_id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("
        INSERT INTO articles_commande (commande_id, nom_article, quantite, prix_unitaire, id_user) 
        VALUES (?, ?, ?, ?, ?)
    ");

    foreach ($data['articles'] as $article) {
        $res = $stmt->execute([
            (int)$commande_id,
            $article['nom_article'],
            (int)$article['quantite'],
            (float)$article['prix_unitaire'],
            (int)$data['id_user']
        ]);
        if (!$res) {
            throw new Exception("Erreur lors de l'insertion d'un article (" . $article['nom_article'] . ")");
        }
    }

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Commande créée avec succès",
        "commande_id" => $commande_id,
        "articles_count" => count($data['articles'])
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Erreur lors de l’enregistrement",
        "erreur" => $e->getMessage()
    ]);
}
