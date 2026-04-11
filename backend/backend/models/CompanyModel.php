<?php
// backend/models/CompanyModel.php

namespace Models;

use PDO;

class CompanyModel {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function getProfileByUserId($userId) {
        $stmt = $this->db->prepare("
            SELECT c.*, u.name, u.email 
            FROM companies c 
            JOIN users u ON c.user_id = u.id 
            WHERE c.user_id = ?
        ");
        $stmt->execute([$userId]);
        return $stmt->fetch();
    }

    public function updateProfile($userId, $data) {
        $sql = "UPDATE companies SET 
                company_name = :name, 
                industry = :industry, 
                website = :website, 
                description = :description 
                WHERE user_id = :user_id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'name' => $data['company_name'],
            'industry' => $data['industry'],
            'website' => $data['website'],
            'description' => $data['description'],
            'user_id' => $userId
        ]);
    }
}
