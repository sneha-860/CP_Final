<?php
// backend/models/NotificationModel.php

namespace Models;

use PDO;

class NotificationModel {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function create($userId, $type, $message) {
        $stmt = $this->db->prepare("INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)");
        return $stmt->execute([$userId, $type, $message]);
    }

    public function getByUserId($userId) {
        $stmt = $this->db->prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public function markAsRead($id, $userId) {
        $stmt = $this->db->prepare("UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?");
        return $stmt->execute([$id, $userId]);
    }
}
