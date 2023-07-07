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

    public function show($id)
    {
        $score = Score::find($id);
        if (!$score) {
            return response()->json(['message' => 'Score not found'], 404);
        }
        return response()->json($score);
    }

    public function update(Request $request, $id)
    {
        $score = Score::find($id);
        if (!$score) {
            return response()->json(['message' => 'Score not found'], 404);
        }
        $score->update($request->all());
        return response()->json($score);
    }

    public function destroy($id)
    {
        $score = Score::find($id);
        if (!$score) {
            return response()->json(['message' => 'Score not found'], 404);
        }
        $score->delete();
        return response()->json(['message' => 'Score deleted']);
    }
}
