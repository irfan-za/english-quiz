<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    
    public function index()
    {
        $scores = Score::all();
        return response()->json($scores);
    }

    public function store(Request $request)
    {
        $score = Score::create($request->all());
        return response()->json($score, 201);
    }

}
