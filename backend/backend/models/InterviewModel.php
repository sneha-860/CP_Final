<?php
// backend/models/InterviewModel.php

namespace Models;

use PDO;

class InterviewModel {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function create($data) {
        $stmt = $this->db->prepare("
            INSERT INTO interviews (application_id, interview_date, location, type, notes, status) 
            VALUES (?, ?, ?, ?, ?, 'scheduled')
        ");
        return $stmt->execute([
            $data['application_id'],
            $data['interview_date'],
            $data['location'],
            $data['type'],
            $data['notes']
        ]);
    }

    public function getByUserId($userId, $role) {
        $sql = "SELECT i.*, j.role as job_title, c.company_name 
                FROM interviews i 
                JOIN applications a ON i.application_id = a.id 
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
}
