@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h4>Daftar Soal</h4>
                    
                </div>

                <div class="card-body">
                    <ul>
                        @foreach ($questions as $question)
                      <li>[ {{$question->question}} - {{$question->level}} ] <a href="{{route('questions.show', $question->id)}}">detail</a></li>
                        @endforeach
                    </ul>

                    <br>
                    <p class="message">{{ session('message') }}</p>
                    <p class="message message-delete">{{ session('message-delete') }}</p>
                    <br><br>
                    <button class="btn btn-success">
                        <a class=" text-white" href="{{route('questions.add')}}">Tambah soal</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection