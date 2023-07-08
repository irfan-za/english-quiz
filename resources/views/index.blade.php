@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <h5>Selamat Datang di Halaman Admin</h5>
                    <p>Anda dapat melakukan CRUD (Create, Read, Update, Delete) untuk melihat data, mengedit, menghapus, dan sebagainya.</p>


                    <button class="btn btn-primary">
                        <a href="/questions" class="text-white">daftar soal</a>
                    </button>
                    <button class="btn btn-secondary">
                        <a href="/questions/add" class="text-white">tambah soal</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
