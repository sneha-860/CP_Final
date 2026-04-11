<?php
// backend/controllers/InterviewController.php

namespace Controllers;

use Models\InterviewModel;
use Helpers\ResponseHelper;
use Middleware\AuthMiddleware;
use PDO;

class InterviewController {
    private $interviewModel;

    public function __construct(PDO $db) {
        $this->interviewModel = new InterviewModel($db);
    }

    public function index() {
        $user = AuthMiddleware::handle();
        $interviews = $this->interviewModel->getByUserId($user['id'], $user['role']);
        ResponseHelper::success($interviews, "Interviews fetched");
    }

    public function store() {
        AuthMiddleware::handle('company');
        $data = json_decode(file_get_contents("php://input"), true);
        $this->interviewModel->create($data);
        ResponseHelper::success(null, "Interview scheduled", 201);
    }
}

// backend/controllers/NotificationController.php
// Combined creation to save turns, but let's stick to one file per tool call if content is large.
// I'll do InterviewController first.
