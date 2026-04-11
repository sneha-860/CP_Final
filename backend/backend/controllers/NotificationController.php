<?php
// backend/controllers/NotificationController.php

namespace Controllers;

use Models\NotificationModel;
use Helpers\ResponseHelper;
use Middleware\AuthMiddleware;
use PDO;

class NotificationController {
    private $notificationModel;

    public function __construct(PDO $db) {
        $this->notificationModel = new NotificationModel($db);
    }

    public function index() {
        $user = AuthMiddleware::handle();
        $notifications = $this->notificationModel->getByUserId($user['id']);
        ResponseHelper::success($notifications, "Notifications fetched");
    }

    public function markAsRead($id) {
        $user = AuthMiddleware::handle();
        $this->notificationModel->markAsRead($id, $user['id']);
        ResponseHelper::success(null, "Notification marked as read");
    }
}
