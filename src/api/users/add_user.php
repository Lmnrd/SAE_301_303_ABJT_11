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
    !isset($data['firstname']) || empty($data['firstname']) ||
    !isset($data['lastname'])  || empty($data['lastname'])  ||
    !isset($data['email'])     || empty($data['email'])     ||
    !isset($data['type_compte']) ||
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

// conversion du boolean front en string pour la BDD
// quand on coche ou non la case, on envoie un boolean true ou false
// on le convertit en string "etudiant" ou "normal"
$typeCompteStr = $data['type_compte'] ? 'etudiant' : 'normal';

$userId = $manager->insertUser(
    $data['firstname'],
    $data['lastname'],
    $data['email'],
    $hashedPassword,
    $typeCompteStr
);

http_response_code(201);
echo json_encode([
    "message" => "Utilisateur créé",
    "user" => [
        "id" => $userId,
        "firstname" => $data['firstname'],
        "lastname" => $data['lastname'],
        "email" => $data['email'],
        "type_compte" => $typeCompteStr
    ]
]);

