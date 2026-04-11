<?php
// backend/middleware/RoleMiddleware.php

namespace Middleware;

use Helpers\ResponseHelper;

class RoleMiddleware {
    public static function check($user, $allowedRoles) {
        if (!isset($user['role']) || !in_array($user['role'], $allowedRoles)) {
            ResponseHelper::error("Forbidden: Access denied for your role", 403);
        }
    }
}
