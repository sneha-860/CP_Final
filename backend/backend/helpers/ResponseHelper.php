<?php
// backend/helpers/ResponseHelper.php

namespace Helpers;

class ResponseHelper {
    /**
     * Send a standardized JSON response
     * 
     * @param bool $success
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @param array|null $meta
     * @return void
     */
    public static function json($success, $data = null, $message = "", $code = 200, $meta = null) {
        // Clear any previous output
        if (ob_get_length()) ob_clean();
        
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($code);
        
        echo json_encode([
            'success' => $success,
            'data'    => $data,
            'message' => $message,
            'meta'    => $meta
        ]);
        exit;
    }

    public static function error($message, $code = 400, $data = null) {
        self::json(false, $data, $message, $code);
    }

    public static function success($data, $message = "Success", $code = 200, $meta = null) {
        self::json(true, $data, $message, $code, $meta);
    }
}
