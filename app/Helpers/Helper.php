<?php
namespace App\Http\Helper;

class Helper{
    public static function generateResponseTemplate(bool $status, int $httpCode, string $message, mixed $data): array {
        return [
            'status' => $status,
            'httpCode'=>$httpCode,
            'message' => $message,
            'data' => $data
        ];
    }
    public static function newIdIncrement(string $number = '000')
    {
        # code...

        if($number == '000'){
            return "001";
        }else{
            return str_pad($number + 1, 3, "0", STR_PAD_LEFT);
        }

    }
}
