<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetailModel extends Model
{
    use HasFactory;
    protected $table = 'transaction_detail';
    protected $guarded = ['id'];
    public $timestamps = true;

    public function product(){
        return $this->hasOne(ProductModel::class,'product_code','product_code');
    }
}
