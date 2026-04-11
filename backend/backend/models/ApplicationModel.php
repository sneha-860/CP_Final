<?php
// backend/models/ApplicationModel.php

namespace Models;

use PDO;

class ApplicationModel {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function create($studentId, $jobId) {
        $stmt = $this->db->prepare("INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, 'pending')");
        return $stmt->execute([$studentId, $jobId]);
    }

    public function getByStudent($studentId) {
        $stmt = $this->db->prepare("
            SELECT a.*, j.role, j.location, c.company_name, c.logo_url 
            FROM applications a 
            JOIN jobs j ON a.job_id = j.id 
            JOIN companies c ON j.company_id = c.id 
            WHERE a.student_id = ?
            ORDER BY a.applied_at DESC
        ");
        $stmt->execute([$studentId]);
        return $stmt->fetchAll();
    }

    public function getByJob($jobId) {
        $stmt = $this->db->prepare("
            SELECT a.*, u.name as student_name, s.roll_no, s.cgpa, s.resume_url 
            FROM applications a 
            JOIN student_profiles s ON a.student_id = s.user_id 
            JOIN users u ON s.user_id = u.id 
            WHERE a.job_id = ?
        ");
        $stmt->execute([$jobId]);
        return $stmt->fetchAll();
    }

    public function updateStatus($id, $status) {
        $stmt = $this->db->prepare("UPDATE applications SET status = ? WHERE id = ?");
        return $stmt->execute([$status, $id]);
    }
}
