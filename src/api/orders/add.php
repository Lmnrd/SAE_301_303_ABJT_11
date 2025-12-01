<?php
require_once __DIR__ . '/../manager/UserManager.php';
require_once __DIR__ . '/../manager/OrderManager.php';

header("Content-Type: application/json");

// 1 - Vérifier token
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

// 2 - Récupérer la payload
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

    // 3 - Limite : max 10 articles
    $totalQty = 0;
    foreach ($data["items"] as $item) {
        $totalQty += $item["quantity"];
    }
    if ($totalQty > 10) {
        http_response_code(409);
        echo json_encode(["message" => "Max 10 boxes allowed"]);
        exit;
    }

    // 4 - Créer la commande
    $orderId = $orderManager->createOrder($user["id"]);

    $total = 0;

    // 5 - Créer les items
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

    // 6 - Update total
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
