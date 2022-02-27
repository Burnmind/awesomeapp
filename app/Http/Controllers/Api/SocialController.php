<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class SocialController extends Controller
{
    public function auth(): Response|RedirectResponse|\Illuminate\Http\RedirectResponse
    {
        return Socialite::driver('vkontakte')->redirect();
    }

    public function callback(): Redirector|Application|\Illuminate\Http\RedirectResponse
    {
        $socialiteUser = Socialite::driver('vkontakte')->user();
        $user = User::query()->where(['email' => $socialiteUser->getEmail()])->first();

        if (!$user) {
            $user = new User();
            $user->email = $socialiteUser->getEmail();
            $user->password = Str::random();
        }

        $user->name = $socialiteUser->getName();
        $user->avatar = $socialiteUser->getAvatar();
        $user->save();

        Auth::login($user);

        return redirect('reading-club');
    }
}
