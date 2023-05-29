<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }
    // return question for API access
    // public function ez(){
    //     $ezQuestions= Question::where('level','=', 'easy')->get();
    //     return response()->json([
    //         "data"=>$ezQuestions
    //     ]);
    // }
    // public function med(){
    //     $medQuestions= Question::where('level','=', 'medium')->get();
    //     return response()->json([
    //         "data"=>$medQuestions
    //     ]);
    // }
    // public function hard(){
    //     $hardQuestions= Question::where('level','=', 'hard')->get();
    //     return response()->json([
    //         "data"=>$hardQuestions
    //     ]);
    // }

    public function index()
    {
        //paginasi 20 data/page dengan level soal tertentu
        $level = request('level');
        $questions= Question::where('level','=', $level)->paginate(4);
        return response()->json([
                    "data"=>$questions
                ]);
    }
    public function indexAdmin()
    {
        $questions= Question::paginate(20);
        return view('questions.index',[
            'questions'=>$questions,
        ]);
    }
    public function add()
    {
        return view('questions.add');
    }
    public function store(Request $request)
    {
        $question = new Question();
        $question->question = request('question');
        $question->sound_url = request('sound_url');
        $question->hint = request('hint');
        $question->level = request('level');
        $question->save();

        return redirect(route('questions.index'))->with('message', 'berhasil menambah soal ✅');
    }
    public function show($id)
    {
        $question = Question::findOrFail($id);
        return view('questions.show', ['question'=>$question]);
    }
    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();
        
        return redirect('/questions')->with('message-delete', 'Berhasil menghapus soal 🗑️');
    }
}
