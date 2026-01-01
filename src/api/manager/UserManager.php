<?php
require_once __DIR__ . '/../config/db.php';

class UserManager {

    private $pdo;

    public function __construct() {
        $db = new Database();
        $this->pdo = $db->getConnection();
    }

    public function insertUser($firstname, $lastname, $email, $hashedPassword, $type_compte) {
        $sql = "INSERT INTO users (firstname, lastname, email, password, type_compte)
                VALUES (:firstname, :lastname, :email, :password, :type_compte)";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':firstname' => $firstname,
            ':lastname' => $lastname,
            ':email' => $email,
            ':password' => $hashedPassword,
            ':type_compte' => $type_compte
        ]);
        return $this->pdo->lastInsertId();
    }

    public function findUserByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateToken($userId, $token) {
        $stmt = $this->pdo->prepare(
            "UPDATE users SET api_token = :token WHERE id = :id"
        );
        $stmt->execute([
            ':token' => $token,
            ':id' => $userId
        ]);
    }

    public function findByToken($token) {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM users WHERE api_token = :token"
        );
        $stmt->execute([':token' => $token]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
