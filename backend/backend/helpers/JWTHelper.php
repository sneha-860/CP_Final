<?php
// backend/helpers/JWTHelper.php

namespace Helpers;

class JWTHelper {
    private static $secret = 'campus_hire_secret_key_2024_!@#'; // Should match .env
    private static $expiry = 86400;

    public static function encode($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['exp'] = time() + self::$expiry;
        $payload = json_encode($payload);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function decode($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return false;

        [$header, $payload, $signature] = $parts;

        $decodedSignature = base64_decode(str_replace(['-', '_'], ['+', '/'], $signature));
        $expectedSignature = hash_hmac('sha256', $header . "." . $payload, self::$secret, true);

        if (!hash_equals($decodedSignature, $expectedSignature)) return false;

        $decodedPayload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payload)), true);
        
        if (isset($decodedPayload['exp']) && $decodedPayload['exp'] < time()) return false;

        return $decodedPayload;
    }
}
