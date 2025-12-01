<?php
require_once __DIR__ . '/../manager/UserManager.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:4200"); // autorise le front Angular local
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // autorise l'envoi des entêtes JSON/token
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // méthodes permises pour cette ressource
header("Access-Control-Allow-Credentials: true"); // permet l'envoi des cookies/credentials

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // réponse rapide au preflight CORS
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['firstname']) || empty($data['firstname']) ||
    !isset($data['lastname'])  || empty($data['lastname'])  ||
    !isset($data['email'])     || empty($data['email'])     ||
    !isset($data['password'])  || empty($data['password'])
) {
    http_response_code(400);
    echo json_encode(["message" => "Champs manquants"]);
    exit;
}

$manager = new UserManager();

if ($manager->findUserByEmail($data['email'])) {
    http_response_code(409);
    echo json_encode(["message" => "Email déjà utilisé"]);
    exit;
}

$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

$manager->insertUser(
    $data['firstname'],
    $data['lastname'],
    $data['email'],
    $hashedPassword
);

http_response_code(201);
echo json_encode(["message" => "Utilisateur créé"]);
