<?php
// backend/routes/api.php

use Helpers\ResponseHelper;
use Controllers\AuthController;
use Controllers\StudentController;
use Controllers\CompanyController;
use Controllers\AdminController;
use Controllers\JobController;
use Controllers\ApplicationController;
use Controllers\InterviewController;
use Controllers\NotificationController;

// Database Connection
$dbConfig = require_once __DIR__ . '/../config/database.php';
try {
    $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['db']};charset={$dbConfig['charset']}";
    $db = new PDO($dsn, $dbConfig['user'], $dbConfig['pass'], $dbConfig['options']);
} catch (\PDOException $e) {
    ResponseHelper::error("Database connection failed: " . $e->getMessage(), 500);
    exit;
}

// Simple Router
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$scriptDir = dirname($_SERVER['SCRIPT_NAME']);
$path = str_replace($scriptDir, '', $path);
$path = trim($path, '/');

// Auth Routes
if ($path === 'api/auth/login' && $method === 'POST') {
    (new AuthController($db))->login();
    exit;
}
if ($path === 'api/auth/register' && $method === 'POST') {
    (new AuthController($db))->register();
    exit;
}

// Job Routes
if ($path === 'api/jobs' && $method === 'GET') {
    (new JobController($db))->index();
    exit;
}
if ($path === 'api/jobs' && $method === 'POST') {
    (new JobController($db))->store();
    exit;
}
if (preg_match('/^api\/jobs\/(\d+)$/', $path, $matches) && $method === 'GET') {
    (new JobController($db))->show($matches[1]);
    exit;
}

// Student Routes
if ($path === 'api/student/profile' && $method === 'GET') {
    (new StudentController($db))->getProfile();
    exit;
}
if ($path === 'api/student/profile' && $method === 'POST') {
    (new StudentController($db))->updateProfile();
    exit;
}
if ($path === 'api/student/apply' && $method === 'POST') {
    (new StudentController($db))->apply();
    exit;
}
if ($path === 'api/student/applications' && $method === 'GET') {
    (new StudentController($db))->applications();
    exit;
}

// Company Routes
if ($path === 'api/company/profile' && $method === 'GET') {
    (new CompanyController($db))->getProfile();
    exit;
}
if (preg_match('/^api\/company\/jobs\/(\d+)\/applicants$/', $path, $matches) && $method === 'GET') {
    (new CompanyController($db))->getJobApplicants($matches[1]);
    exit;
}

// Application Status Update
if ($path === 'api/applications/status' && $method === 'POST') {
    (new ApplicationController($db))->updateStatus();
    exit;
}

// Interview Routes
if ($path === 'api/interviews' && $method === 'GET') {
    (new InterviewController($db))->index();
    exit;
}
if ($path === 'api/interviews' && $method === 'POST') {
    (new InterviewController($db))->store();
    exit;
}

// Notification Routes
if ($path === 'api/notifications' && $method === 'GET') {
    (new NotificationController($db))->index();
    exit;
}
if (preg_match('/^api\/notifications\/(\d+)\/read$/', $path, $matches) && $method === 'POST') {
    (new NotificationController($db))->markAsRead($matches[1]);
    exit;
}

// Admin Routes
if ($path === 'api/admin/stats' && $method === 'GET') {
    (new AdminController($db))->dashboardStats();
    exit;
}
if ($path === 'api/admin/users' && $method === 'GET') {
    (new AdminController($db))->manageUsers();
    exit;
}

// 404
ResponseHelper::error("Endpoint not found: " . $path, 404);
