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
        Schema::create('transaction_header', function (Blueprint $table) {
            $table->id();
            $table->string('document_code',3);
            $table->string('document_number',10);
            $table->string('user',50);
            $table->addColumn("integer","total",[
                'length' => 10,
            ]);
            $table->addColumn("date",'date',[
                'length' => 10
            ]);
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
        Schema::dropIfExists('transaction_header');
    }
};
