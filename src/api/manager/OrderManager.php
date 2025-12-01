<?php
require_once __DIR__ . '/../config/db.php';

class OrderManager {

    private $pdo;

    public function __construct() {
        $db = new Database();
        $this->pdo = $db->getConnection();
    }

    public function createOrder($userId) {
        $stmt = $this->pdo->prepare(
            "INSERT INTO orders (user_id) VALUES (:user_id)"
        );
        $stmt->execute([':user_id' => $userId]);
        return $this->pdo->lastInsertId();
    }

    public function insertOrderItem($orderId, $boxId, $qty, $unitPrice) {
        $stmt = $this->pdo->prepare(
            "INSERT INTO order_items (order_id, box_id, quantity, unit_price)
             VALUES (:order_id, :box_id, :quantity, :unit_price)"
        );
        $stmt->execute([
            ':order_id' => $orderId,
            ':box_id' => $boxId,
            ':quantity' => $qty,
            ':unit_price' => $unitPrice
        ]);
    }

    public function updateTotal($orderId, $total) {
        $stmt = $this->pdo->prepare(
            "UPDATE orders SET total_price = :total WHERE id = :id"
        );
        $stmt->execute([
            ':total' => $total,
            ':id' => $orderId
        ]);
    }

    public function getBoxById($boxId) {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM boxes WHERE id = :id"
        );
        $stmt->execute([':id' => $boxId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
