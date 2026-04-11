<?php
// backend/controllers/StudentController.php

namespace Controllers;

use Models\StudentModel;
use Models\ApplicationModel;
use Models\JobModel;
use Helpers\ResponseHelper;
use Helpers\UploadHelper;
use Middleware\AuthMiddleware;
use PDO;

class StudentController {
    private $studentModel;
    private $appModel;
    private $jobModel;

    public function __construct(PDO $db) {
        $this->studentModel = new StudentModel($db);
        $this->appModel = new ApplicationModel($db);
        $this->jobModel = new JobModel($db);
    }

    public function getProfile() {
        $user = AuthMiddleware::handle();
        $profile = $this->studentModel->getProfileByUserId($user['id']);
        ResponseHelper::success($profile, "Profile fetched");
    }

    public function updateProfile() {
        $user = AuthMiddleware::handle();
        $data = json_decode($_POST['data'] ?? '{}', true);
        
        if (isset($_FILES['resume'])) {
            $data['resume_url'] = UploadHelper::upload($_FILES['resume'], 'resumes', $user['id']);
        }
        
        if (isset($_FILES['photo'])) {
            $data['profile_photo_url'] = UploadHelper::upload($_FILES['photo'], 'photos', $user['id']);
        }

        $this->studentModel->updateProfile($user['id'], $data);
        ResponseHelper::success(null, "Profile updated");
    }

    public function apply() {
        $user = AuthMiddleware::handle();
        $data = json_decode(file_get_contents("php://input"), true);
        $jobId = $data['job_id'];

        $this->appModel->create($user['id'], $jobId);
        ResponseHelper::success(null, "Application submitted");
    }

    public function applications() {
        $user = AuthMiddleware::handle();
        $apps = $this->appModel->getByStudent($user['id']);
        ResponseHelper::success($apps, "Applications fetched");
    }
}
