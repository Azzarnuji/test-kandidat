<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHeaderModel extends Model
{
    use HasFactory;
    protected $table = 'transaction_header';
    protected $guarded = ['id'];
    public $timestamps = true;

    public function transactionDetail(){
        return $this->hasOne(TransactionDetailModel::class,'document_number','document_number');
    }
}
