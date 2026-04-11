<?php
// backend/config/database.php
return [
    'host' => 'localhost',
    'db'   => 'campus_placement',
    'user' => 'root',
    'pass' => '',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERR_MODE            => PDO::ERR_MODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ],
];
