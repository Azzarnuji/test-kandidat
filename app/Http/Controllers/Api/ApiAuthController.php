<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helper\Helper;
use App\Models\AuthModel;
use Illuminate\Http\Request;

class ApiAuthController extends Controller
{
    //

    public function login(Request $req){
        $username = $req->input('username');
        $password = $req->input('password');

        try {
            $checkUser = AuthModel::where('user', $username)->where('password', $password)->first();
            if($checkUser){
                return response()->json(Helper::generateResponseTemplate(true, 200, 'Login Success', $checkUser),200);
            }else{
                return response()->json(Helper::generateResponseTemplate(false, 401, 'Login Failed', null),401);
            }
        } catch (\Exception $e) {
            //throw $th;
            dd($e);
        }
    }
}
