<?php
// backend/controllers/AuthController.php

namespace Controllers;

use Models\UserModel;
use Helpers\JWTHelper;
use Helpers\ResponseHelper;
use Helpers\ValidationHelper;
use PDO;

class AuthController {
    private $userModel;

    public function __construct(PDO $db) {
        $this->userModel = new UserModel($db);
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        $errors = ValidationHelper::validate($data, [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if (!empty($errors)) {
            ResponseHelper::error("Validation failed", 422, $errors);
        }

        $user = $this->userModel->findByEmail($data['email']);

        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            ResponseHelper::error("Invalid credentials", 401);
        }

        $token = JWTHelper::encode([
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role']
        ]);

        ResponseHelper::success([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ], "Login successful");
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);

        $errors = ValidationHelper::validate($data, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'role' => 'required'
        ]);

        if (!empty($errors)) {
            ResponseHelper::error("Validation failed", 422, $errors);
        }

        if ($this->userModel->findByEmail($data['email'])) {
            ResponseHelper::error("Email already exists", 400);
        }

        $userId = $this->userModel->create($data);
        
        ResponseHelper::success(['user_id' => $userId], "Registration successful", 201);
    }
}
