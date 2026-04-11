<?php
// backend/helpers/ValidationHelper.php

namespace Helpers;

class ValidationHelper {
    public static function validate($data, $rules) {
        $errors = [];
        foreach ($rules as $field => $fieldRules) {
            $value = $data[$field] ?? null;
            $ruleList = explode('|', $fieldRules);

            foreach ($ruleList as $rule) {
                if ($rule === 'required' && (is_null($value) || $value === '')) {
                    $errors[$field] = ucfirst($field) . " is required";
                    break;
                }
                if ($rule === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $errors[$field] = "Invalid email format";
                    break;
                }
                if (str_starts_with($rule, 'min:')) {
                    $min = (int) explode(':', $rule)[1];
                    if (strlen($value) < $min) {
                        $errors[$field] = ucfirst($field) . " must be at least $min characters";
                        break;
                    }
                }
            }
        }
        return $errors;
    }
}
