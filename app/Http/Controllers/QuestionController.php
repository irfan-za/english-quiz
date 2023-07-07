<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{

    public function index()
    {
        //paginasi 20 data/page dengan level soal tertentu
        $level = request('level');
        $questions= Question::where('level','=', $level)->paginate(10);
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
    public function edit($id)
    {
        $question = Question::findOrFail($id);
        return view('questions.edit', compact('question'));
    }
    
    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);
        $request->validate([
            'question' => 'required',
            'sound_url' => 'required',
        ]);
        
        // Mengupdate nilai field berdasarkan input
        $question->question = request('question');
        $question->sound_url = request('sound_url');
        $question->hint = request('hint');
        $question->level = request('level');
        $question->save();
        
        // Redirect ke halaman lain atau lakukan tindakan lainnya
        return redirect()->route('questions.index')->with('success', 'Data berhasil diperbarui.');
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
        
        return redirect('questions.index')->with('message-delete', 'Berhasil menghapus soal 🗑️');
    }
}
