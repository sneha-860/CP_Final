<?php
// backend/middleware/AuthMiddleware.php

namespace Middleware;

use Helpers\JWTHelper;
use Helpers\ResponseHelper;

class AuthMiddleware {
    /**
     * @param string|array $requiredRoles
     */
    public static function handle($requiredRoles = null) {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? '';

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            ResponseHelper::error("Unauthorized", 401);
        }

        $payload = JWTHelper::decode($matches[1]);
        if (!$payload) {
            ResponseHelper::error("Invalid or expired token", 401);
        }

        if ($requiredRoles) {
            $roles = is_array($requiredRoles) ? $requiredRoles : [$requiredRoles];
            if (!in_array($payload['role'], $roles)) {
                ResponseHelper::error("Forbidden: Insufficient permissions", 403);
            }
        }

        return $payload;
    }
}
