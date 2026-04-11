<?php
// backend/controllers/AdminController.php

namespace Controllers;

use Models\UserModel;
use Models\StudentModel;
use Models\CompanyModel;
use Helpers\ResponseHelper;
use Middleware\AuthMiddleware;
use PDO;

class AdminController {
    private $userModel;
    private $studentModel;
    private $companyModel;

    public function __construct(PDO $db) {
        $this->userModel = new UserModel($db);
        $this->studentModel = new StudentModel($db);
        $this->companyModel = new CompanyModel($db);
    }

    public function dashboardStats() {
        AuthMiddleware::handle('admin');
        // Simple count stats for dashboard
        $stats = [
            'total_students' => $this->studentModel->getCount(),
            'total_companies' => $this->companyModel->getCount(),
            // ... more stats
        ];
        ResponseHelper::success($stats, "Dashboard stats fetched");
    }

    public function manageUsers() {
        AuthMiddleware::handle('admin');
        $users = $this->userModel->getAll();
        ResponseHelper::success($users, "Users fetched");
    }
}
