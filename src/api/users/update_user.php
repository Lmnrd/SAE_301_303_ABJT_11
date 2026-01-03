<?php
// ============================================================================
// update_user.php - Mise à jour des informations utilisateur
// Ce fichier permet de modifier les informations d'un utilisateur
// Table concernée : users
// ============================================================================

// Headers CORS pour autoriser les requêtes depuis Angular
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Inclusion des dépendances
require_once __DIR__ . '/../manager/UserManager.php';

// Récupération des données JSON envoyées par Angular
$data = json_decode(file_get_contents("php://input"), true);

// VALIDATION : Vérifier que les champs requis sont présents
if (
    !isset($data['id']) || empty($data['id']) ||
    !isset($data['firstname']) || empty($data['firstname']) ||
    !isset($data['lastname']) || empty($data['lastname']) ||
    !isset($data['email']) || empty($data['email'])
) {
    http_response_code(400);
    echo json_encode(["message" => "Champs manquants"]);
    exit;
}

$manager = new UserManager();

// Vérifier que l'email n'est pas déjà utilisé par un autre utilisateur
$existingUser = $manager->findUserByEmail($data['email']);
if ($existingUser && $existingUser['id'] != $data['id']) {
    http_response_code(409);
    echo json_encode(["message" => "Cet email est déjà utilisé par un autre compte"]);
    exit;
}

try {
    // Récupérer les nouveaux champs (optionnels)
    $telephone = isset($data['telephone']) ? $data['telephone'] : null;
    $coordonnees_bancaires = isset($data['coordonnees_bancaires']) ? $data['coordonnees_bancaires'] : null;
    $adresse_livraison = isset($data['adresse_livraison']) ? $data['adresse_livraison'] : null;

    // Mettre à jour l'utilisateur dans la base de données
    $manager->updateUser(
        (int)$data['id'],
        $data['firstname'],
        $data['lastname'],
        $data['email'],
        $telephone,
        $coordonnees_bancaires,
        $adresse_livraison
    );

    // Retourner les nouvelles informations
    echo json_encode([
        "status" => "success",
        "message" => "Informations mises à jour avec succès",
        "user" => [
            "id" => (int)$data['id'],
            "firstname" => $data['firstname'],
            "lastname" => $data['lastname'],
            "email" => $data['email'],
            "telephone" => $telephone,
            "coordonnees_bancaires" => $coordonnees_bancaires,
            "adresse_livraison" => $adresse_livraison
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Erreur lors de la mise à jour",
        "erreur" => $e->getMessage()
    ]);
}
