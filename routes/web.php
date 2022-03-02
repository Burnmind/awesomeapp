<?php

use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn() => view('pages/main'));

Route::group(['middleware' => 'guest'], function() {
    Route::get('vk/auth', [SocialController::class, 'auth']);
    Route::get('vk/auth/callback',  [SocialController::class, 'callback']);
});

Route::get('/reading-club', fn() => view('pages/reading-club'))->name('reading-club');
