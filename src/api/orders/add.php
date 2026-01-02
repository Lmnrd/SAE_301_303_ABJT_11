// fichier PHP qui permet de recevoir les informations de la commande et de les stocker dans la base de données
// permet ensuite d'afficher les détails des box précédemment commandées par l'utilisateur connecté

<?php
require_once __DIR__ . '/../manager/UserManager.php';
require_once __DIR__ . '/../manager/OrderManager.php';

header("Content-Type: application/json");

// vérifie le token
$headers = getallheaders();

if (!isset($headers["Authorization"])) {
    http_response_code(401);
    echo json_encode(["message" => "No token provided"]);
    exit;
}

$token = str_replace("Bearer ", "", $headers["Authorization"]);
$userManager = new UserManager();
$user = $userManager->findByToken($token);

if (!$user) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid token"]);
    exit;
}

// récupère la payload
// payload = c'est l'objet JSON qui contient par exemple la liste des sushis, les quantités et le prix.
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["items"]) || !is_array($data["items"])) {
    http_response_code(400);
    echo json_encode(["message" => "Missing items"]);
    exit;
}

$pdo = (new Database())->getConnection();
$orderManager = new OrderManager();

try {
    $pdo->beginTransaction();

    // limite : max 10 articles
    $totalQty = 0;
    foreach ($data["items"] as $item) {
        $totalQty += $item["quantity"];
    }
    if ($totalQty > 10) {
        http_response_code(409);
        echo json_encode(["message" => "Max 10 boxes allowed"]);
        exit;
    }

    // créer la commande
    $orderId = $orderManager->createOrder($user["id"]);

    $total = 0;

    // créer les items
    foreach ($data["items"] as $item) {

        if (!isset($item["box_id"]) || !isset($item["quantity"])) {
            throw new Exception("Missing fields");
        }

        $box = $orderManager->getBoxById($item["box_id"]);
        if (!$box) {
            throw new Exception("Box not found");
        }

        $unitPrice = $box["price"];
        $qty = $item["quantity"];

        $orderManager->insertOrderItem($orderId, $item["box_id"], $qty, $unitPrice);

        $total += $qty * $unitPrice;
    }

    // update total
    $orderManager->updateTotal($orderId, $total);

    $pdo->commit();

    echo json_encode([
        "message" => "Order created",
        "order_id" => $orderId,
        "total" => $total
    ]);

} catch (Exception $e) {

    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
