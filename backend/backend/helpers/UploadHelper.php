<?php
// backend/helpers/UploadHelper.php

namespace Helpers;

class UploadHelper {
    public static function upload($file, $folder, $prefix = '') {
        $uploadDir = __DIR__ . "/../uploads/" . $folder . "/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = $prefix . "_" . time() . "_" . bin2hex(random_bytes(4)) . "." . $extension;
        $targetPath = $uploadDir . $fileName;

        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            return $fileName;
        }

        return false;
    }

    public static function validateImage($file) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        return in_array($file['type'], $allowedTypes);
    }

    public static function validatePDF($file) {
        return $file['type'] === 'application/pdf';
    }
}
