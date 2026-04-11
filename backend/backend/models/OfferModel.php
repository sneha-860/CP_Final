<?php
// backend/models/OfferModel.php

namespace Models;

use PDO;

class OfferModel {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function create($data) {
        $stmt = $this->db->prepare("
            INSERT INTO offers (application_id, salary_package, joining_date, offer_letter_url, status) 
            VALUES (?, ?, ?, ?, 'pending')
        ");
        return $stmt->execute([
            $data['application_id'],
            $data['salary_package'],
            $data['joining_date'],
            $data['offer_letter_url']
        ]);
    }

    public function getByUserId($userId, $role) {
        $sql = "SELECT o.*, j.role as job_title, c.company_name 
                FROM offers o 
                JOIN applications a ON o.application_id = a.id 
                JOIN jobs j ON a.job_id = j.id 
                JOIN companies c ON j.company_id = c.id";
        
        if ($role === 'student') {
            $sql .= " WHERE a.student_id = ?";
        } else if ($role === 'company') {
            $sql .= " WHERE j.company_id = (SELECT id FROM companies WHERE user_id = ?)";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public function updateStatus($id, $status) {
        $stmt = $this->db->prepare("UPDATE offers SET status = ? WHERE id = ?");
        return $stmt->execute([$status, $id]);
    }
}
