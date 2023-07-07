<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ScoreController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// hanya memberikan akses Read untuk api question
Route::get('questions', [QuestionController::class, 'index']);

// api crud score
Route::get('scores', [ScoreController::class, 'index']); // GET /api/scores
Route::post('scores', [ScoreController::class, 'store']); // POST /api/scores
// Route::put('scores/{id}', [ScoreController::class, 'update']); // PUT /api/scores/{id}
// Route::delete('scores/{id}', [ScoreController::class, 'destroy']); // DELETE /api/scores/{id}
