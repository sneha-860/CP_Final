<?php
// backend/models/StudentModel.php

namespace Models;

use PDO;

class StudentModel {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function getProfileByUserId($userId) {
        $stmt = $this->db->prepare("
            SELECT s.*, u.name, u.email 
            FROM student_profiles s 
            JOIN users u ON s.user_id = u.id 
            WHERE s.user_id = ?
        ");
        $stmt->execute([$userId]);
        $profile = $stmt->fetch();
        if ($profile && isset($profile['skills'])) {
            $profile['skills'] = json_decode($profile['skills'], true);
        }
        return $profile;
    }

    public function updateProfile($userId, $data) {
        $sql = "UPDATE student_profiles SET 
                roll_no = :roll_no, 
                branch = :branch, 
                batch_year = :batch_year, 
                cgpa = :cgpa, 
                skills = :skills";
        
        $params = [
            'roll_no' => $data['roll_no'],
            'branch' => $data['branch'],
            'batch_year' => $data['batch_year'],
            'cgpa' => $data['cgpa'],
            'skills' => json_encode($data['skills'] ?? []),
            'user_id' => $userId
        ];

        if (isset($data['resume_url'])) {
            $sql .= ", resume_url = :resume_url";
            $params['resume_url'] = $data['resume_url'];
        }

        if (isset($data['profile_photo_url'])) {
            $sql .= ", profile_photo_url = :profile_photo_url";
            $params['profile_photo_url'] = $data['profile_photo_url'];
        }

        $sql .= " WHERE user_id = :user_id";

        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }
}
