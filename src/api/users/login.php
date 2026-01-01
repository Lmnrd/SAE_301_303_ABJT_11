<?php
require_once __DIR__ . '/../manager/UserManager.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['email']) || empty($data['email']) ||
    !isset($data['password']) || empty($data['password'])
) {
    http_response_code(400);
    echo json_encode(["message" => "Champs manquants"]);
    exit;
}

$manager = new UserManager();
$user = $manager->findUserByEmail($data['email']);

if (!$user || !password_verify($data['password'], $user['password'])) {
    http_response_code(401);
    echo json_encode(["message" => "Identifiants incorrects"]);
    exit;
}

$token = bin2hex(random_bytes(32));

$manager->updateToken($user['id'], $token);

echo json_encode([
    "message" => "Connexion réussie",
    "token" => $token,
    "user" => [
        "id" => (int)$user['id'],
        "firstname" => $user['firstname'],
        "lastname" => $user['lastname'],
        "email" => $user['email'],
        "type_compte" => $user['type_compte']
    ]
]);
