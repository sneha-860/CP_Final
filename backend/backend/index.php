<?php
// backend/index.php

require_once __DIR__ . '/autoload.php';

use Middleware\CorsMiddleware;
use Helpers\ResponseHelper;

// Handle CORS
CorsMiddleware::handle();

// Basic Routing Logic (Simple Dispatcher)
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$scriptName = dirname($_SERVER['SCRIPT_NAME']);
$route = str_replace($scriptName, '', $requestUri);
$route = explode('?', $route)[0]; // Remove query string

// Normalize route
$route = trim($route, '/');

// Dispatch to API routes
if (str_starts_with($route, 'api/')) {
    require_once __DIR__ . '/routes/api.php';
} else {
    ResponseHelper::error("Page not found", 404);
}
