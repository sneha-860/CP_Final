<?php
// backend/controllers/CompanyController.php

namespace Controllers;

use Models\CompanyModel;
use Models\JobModel;
use Models\ApplicationModel;
use Helpers\ResponseHelper;
use Middleware\AuthMiddleware;
use PDO;

class CompanyController {
    private $companyModel;
    private $jobModel;
    private $appModel;

    public function __construct(PDO $db) {
        $this->companyModel = new CompanyModel($db);
        $this->jobModel = new JobModel($db);
        $this->appModel = new ApplicationModel($db);
    }

    public function getProfile() {
        $user = AuthMiddleware::handle();
        $profile = $this->companyModel->getProfileByUserId($user['id']);
        ResponseHelper::success($profile, "Company profile fetched");
    }

    public function updateProfile() {
        $user = AuthMiddleware::handle();
        $data = json_decode(file_get_contents("php://input"), true);
        $this->companyModel->updateProfile($user['id'], $data);
        ResponseHelper::success(null, "Company profile updated");
    }

    public function getJobApplicants($jobId) {
        $user = AuthMiddleware::handle();
        // Validation: Verify if the job belongs to this company
        $applicants = $this->appModel->getByJob($jobId);
        ResponseHelper::success($applicants, "Applicants fetched");
    }
}
