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

$headers = getallheaders();

if (!isset($headers["Authorization"])) {
    http_response_code(401);
    echo json_encode(["message" => "No token provided"]);
    exit;
}

$token = str_replace("Bearer ", "", $headers["Authorization"]);

$manager = new UserManager();
$user = $manager->findByToken($token);

if (!$user) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid token"]);
    exit;
}

echo json_encode([
    "message" => "Accès autorisé",
    "orders" => []
]);
