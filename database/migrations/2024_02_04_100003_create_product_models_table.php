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
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('product_code',18);
            $table->string('product_name',30);
            $table->addColumn("integer","price",[
                'length' => 6,
                'unsigned' => true
            ]);
            $table->string('currency',5)->default('IDR');
            $table->addColumn("integer","discount",[
                'length' => 6,
            ]);
            $table->string('dimension',50);
            $table->string('unit',5)->default('PCS');
            $table->softDeletes();
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
        Schema::dropIfExists('product');
    }
};
