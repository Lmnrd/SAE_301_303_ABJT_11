// fichier PHP qui permet de récupérer les commandes d'un utilisateur connecté
// il permet de recevoir l'id de l'utilisateur et de récupérer ses commandes
// il permet de retourner les commandes de l'utilisateur

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . "/../config/db.php";

$db = new Database();
$pdo = $db->getConnection();

try {
    $id_user = isset($_GET['id_user']) ? (int)$_GET['id_user'] : null;

    $sql = "
        SELECT 
            c.id AS commande_id,
            c.date_commande,
            c.montant_total,
            a.nom_article,
            a.quantite,
            a.prix_unitaire
        FROM commandes c
        LEFT JOIN articles_commande a ON a.commande_id = c.id
    ";

    $params = [];
    if ($id_user) {
        $sql .= " WHERE c.id_user = ?";
        $params[] = $id_user;
    }

    $sql .= " ORDER BY c.id DESC, a.id ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $commandes = [];
    foreach ($rows as $row) {
        $id = $row['commande_id'];
        if (!isset($commandes[$id])) {
            $commandes[$id] = [
                'id' => (int)$row['commande_id'],
                'date_commande' => $row['date_commande'],
                'montant_total' => (float)$row['montant_total'],
                'articles' => []
            ];
        }
        if ($row['nom_article']) {
            $commandes[$id]['articles'][] = [
                'nom_article' => $row['nom_article'],
                'quantite' => (int)$row['quantite'],
                'prix_unitaire' => (float)$row['prix_unitaire']
            ];
        }
    }

    echo json_encode(array_values($commandes));

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Erreur lors de la récupération des commandes",
        "erreur" => $e->getMessage()
    ]);
}

