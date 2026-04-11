<?php
// backend/controllers/ApplicationController.php

namespace Controllers;

use Models\ApplicationModel;
use Helpers\ResponseHelper;
use Middleware\AuthMiddleware;
use PDO;

class ApplicationController {
    private $appModel;

    public function __construct(PDO $db) {
        $this->appModel = new ApplicationModel($db);
    }

    public function updateStatus() {
        AuthMiddleware::handle(['admin', 'company']);
        $data = json_decode(file_get_contents("php://input"), true);
        $this->appModel->updateStatus($data['id'], $data['status']);
        ResponseHelper::success(null, "Status updated");
    }
}

// backend/controllers/InterviewController.php
// (Included in same write for efficiency, will split if needed but better as separate files usually)
// Let's just do one per file to be safe with the system.
