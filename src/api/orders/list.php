<?php
require_once __DIR__ . '/../manager/UserManager.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
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
