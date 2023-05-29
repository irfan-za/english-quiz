@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Tambah soal</div>

                <div class="card-body">
                  <form action="{{route('questions.store')}}" method="POST">
                    @csrf
                    <table>
                    <tr>
                      <td><label for="question">kata kunci</label></td>
                      <td> : </td>
                      <td><input type="text" name="question" id="question" required></td>
                    </tr>
                    <tr>
                      <td><label for="sound_url">link audio</label></td>
                      <td> : </td>
                      <td><input type="text" name="sound_url" id="sound_url" required></td>
                    </tr>
                    <tr>
                      <td><label for="hint">clue/hint</label></td>
                      <td> : </td>
                      <td><input type="text" name="hint" id="hint" required></td>
                    </tr>
                    <tr>
                      <td><label for="level">level</label></td>
                      <td> : </td>
                      <td>
                        <select name="level" id="level">
                          <option value="easy">easy</option>
                          <option value="medium">medium</option>
                          <option value="hard">hard</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><br></td>
                      <td><br></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <button type="submit">Tambah</button>
                      </td>
                    </tr>
                    </table>
                  </form>

                  <br><br>
                  <a href="{{route('questions.index')}}">kembali ke daftar soal</a>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection