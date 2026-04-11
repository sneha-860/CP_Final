<?php
// backend/controllers/OfferController.php

namespace Controllers;

use Models\OfferModel;
use Helpers\ResponseHelper;
use Middleware\AuthMiddleware;
use PDO;

class OfferController {
    private $offerModel;

    public function __construct(PDO $db) {
        $this->offerModel = new OfferModel($db);
    }

    public function index() {
        $user = AuthMiddleware::handle();
        $offers = $this->offerModel->getByUserId($user['id'], $user['role']);
        ResponseHelper::success($offers, "Offers fetched");
    }

    public function updateStatus() {
        $user = AuthMiddleware::handle();
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validation logic for acceptance/rejection
        $this->offerModel->updateStatus($data['offer_id'], $data['status']);
        ResponseHelper::success(null, "Offer status updated");
    }
}
