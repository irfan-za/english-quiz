<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function index()
    {
        $scores= Score::latest()->get();
        return response()->json([
            'data'=>$scores
        ]);
    }

    public function store(Request $request)
    {
        $score = new Score();
        $score->ez_score = request('ez_score');
        $score->med_score = request('med_score');
        $score->hard_score = request('hard_score');
        $score->user_idFK = request('user_idFK');
        $score->save();

        return response()->json([
            'data' => $score
        ]);
    }

    public function show($id)
    {
        $score = Score::findOrFail($id);
        return response()->json([
            'data' => $score
        ]);
    }

    public function destroy($id)
    {
        $score = Score::findOrFail($id);
        $score->delete();
        return response()->json([
            'message' => 'Score Deleted!',
        ],204);
    }
}
