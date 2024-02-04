<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_detail', function (Blueprint $table) {
            $table->id();
            $table->string('document_code',3);
            $table->string('document_number',10);
            $table->string('product_code',18);
            $table->addColumn("integer","price",[
                'length' => 6,
            ]);
            $table->addColumn("integer",'quantity',[
                'length' => 6
            ]);
            $table->string('unit',5)->default('PCS');
            $table->addColumn("integer","sub_total",[
                'length' => 10,
            ]);
            $table->string('currency',5);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaction_detail');
    }
};
