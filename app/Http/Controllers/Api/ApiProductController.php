<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helper\Helper;
use App\Models\ProductModel;
use App\Models\TransactionDetailModel;
use App\Models\TransactionHeaderModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiProductController extends Controller
{
    //

    public function getProducts(){

        $products = ProductModel::all();
        return response()->json(Helper::generateResponseTemplate(true,200,'Products fetched successfully',$products),200);
    }

    public function getProductById($product_code){
        $product = ProductModel::where('product_code',$product_code)->first();
        if($product){
            return response()->json(Helper::generateResponseTemplate(true,200,'Product fetched successfully',$product),200);
        }else{
            return response()->json(Helper::generateResponseTemplate(false,404,'Product not found',null),404);
        }
    }

    public function checkout(Request $request){
        $product_code = $request->input('data_checkout')['product_code'];
        $quantity = $request->input('data_checkout')['quantity'];
        $sub_total = $request->input('data_checkout')['sub_total'];
        $price = $request->input('data_checkout')['price'];
        $unit = $request->input('data_checkout')['unit'];
        $currency = $request->input('data_checkout')['currency'];
        $user = $request->input('data_user')['user'];
        DB::beginTransaction();
        try {
            $getDocumentNumber = TransactionHeaderModel::orderBy('document_number','desc')->first();
            $generateDocumentNumber = Helper::newIdIncrement(isset($getDocumentNumber->document_number) ? ($getDocumentNumber->document_number) : "000");
            TransactionHeaderModel::create([
                'document_code'=>"TRX",
                'document_number'=>$generateDocumentNumber,
                'user'=>$user,
                'total'=>$sub_total,
                'date'=>Carbon::now()->toDateString(),
            ]);
            TransactionDetailModel::create([
                'document_code'=>"TRX",
                'document_number'=>$generateDocumentNumber,
                'product_code'=>$product_code,
                'price'=>$price,
                'quantity'=>$quantity,
                'unit'=>$unit,
                'sub_total'=>$sub_total,
                'currency'=>$currency
            ]);
            DB::commit();
            return response()->json(Helper::generateResponseTemplate(true,201,'Checkout successfully',null),201);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),500);
            DB::rollBack();
            //throw $th;
        }
        // return response()->json([$product_code,$quantity,$sub_total,$price,$user]);
    }

    public function getReport(){
        $data = TransactionHeaderModel::with(['transactionDetail'=>function($query){
            $query->with('product');
        }])->get()->all();
        return response()->json(Helper::generateResponseTemplate(true,200,'Report fetched successfully',$data),200);
    }
}
