<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestionController;

Route::get('/questions', [QuestionController::class,'indexAdmin'])->name('questions.index')->middleware('auth');
Route::get('/questions/add', [QuestionController::class,'add'])->name('questions.add')->middleware('auth');
Route::post('/questions', [QuestionController::class,'store'])->name('questions.store')->middleware('auth');
Route::get('/questions/{id}', [QuestionController::class,'show'])->name('questions.show')->middleware('auth');
Route::delete('/questions/{id}', [QuestionController::class,'destroy'])->name('questions.destroy')->middleware('auth');

Auth::routes(
  // disable register 
  ['register'=>false]
);

Route::get('/', [App\Http\Controllers\AdminController::class, 'indexAdmin'])->name('admin');
