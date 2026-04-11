<?php
// backend/models/JobModel.php

namespace Models;

use PDO;

class JobModel {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function getAllJobs($filters = []) {
        $sql = "SELECT j.*, c.company_name, c.logo_url 
                FROM jobs j 
                JOIN companies c ON j.company_id = c.id 
                WHERE j.status = 'open'";
        
        $params = [];
        if (!empty($filters['role'])) {
            $sql .= " AND j.role LIKE :role";
            $params['role'] = '%' . $filters['role'] . '%';
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->prepare("
            SELECT j.*, c.company_name, c.website, c.description as company_desc 
            FROM jobs j 
            JOIN companies c ON j.company_id = c.id 
            WHERE j.id = ?
        ");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function create($data) {
        $stmt = $this->db->prepare("
            INSERT INTO jobs (company_id, role, description, location, type, salary, deadline, requirements, eligibility) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $data['company_id'],
            $data['role'],
            $data['description'],
            $data['location'],
            $data['type'],
            $data['salary'],
            $data['deadline'],
            json_encode($data['requirements'] ?? []),
            json_encode($data['eligibility'] ?? [])
        ]);
        return $this->db->lastInsertId();
    }
}
