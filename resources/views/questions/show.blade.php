@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Soal Id ke-{{$question->id}}</div>

                <div class="card-body">
                  <table>
                    <tr>
                      <td>kata kunci </td>
                      <td> : </td>
                      <td>{{$question->question}}</td>
                    </tr>
                    <tr>
                      <td>level </td>
                      <td> : </td>
                      <td>{{$question->level}}</td>
                    </tr>
                    <tr>
                      <td>link audio </td>
                      <td> : </td>
                      <td><a href="{{$question->sound_url}}" target="blank" >{{$question->sound_url}}</a></td>
                    </tr>
                    <tr>
                      <td>hint </td>
                      <td> : </td>
                      <td>{{$question->hint}}</td>
                    </tr>
                  </table>

                  <br><br>
                  <form action="{{route('questions.destroy', $question->id )}}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Hapus</button>
                  </form>
                  <br>
                  <a href="{{route('questions.index')}}">kembali ke daftar soal</a>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection