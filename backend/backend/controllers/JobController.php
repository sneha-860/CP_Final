<?php
// backend/controllers/JobController.php

namespace Controllers;

use Models\JobModel;
use Helpers\ResponseHelper;
use Helpers\ValidationHelper;
use Middleware\AuthMiddleware;
use PDO;

class JobController {
    private $jobModel;

    public function __construct(PDO $db) {
        $this->jobModel = new JobModel($db);
    }

    public function index() {
        $filters = $_GET;
        $jobs = $this->jobModel->getAllJobs($filters);
        ResponseHelper::success($jobs, "Jobs fetched successfully");
    }

    public function show($id) {
        $job = $this->jobModel->findById($id);
        if (!$job) {
            ResponseHelper::error("Job not found", 404);
        }
        ResponseHelper::success($job, "Job details fetched successfully");
    }

    public function store() {
        $user = AuthMiddleware::handle();
        if ($user['role'] !== 'company') {
            ResponseHelper::error("Unauthorized", 403);
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $data['company_id'] = $user['id']; // Map user_id to company profile search or similar logic

        $jobId = $this->jobModel->create($data);
        ResponseHelper::success(['job_id' => $jobId], "Job posted successfully", 201);
    }
}
