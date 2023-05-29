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

                    <button>
                        <a href="/questions">daftar soal</a>
                    </button>
                    <button>
                        <a href="/questions/add">tambah soal</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
