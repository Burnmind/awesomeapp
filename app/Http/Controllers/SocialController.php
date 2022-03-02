<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;
use function redirect;

class SocialController extends Controller
{
    public function auth(): Response|RedirectResponse|\Illuminate\Http\RedirectResponse
    {
        return Socialite::driver('vkontakte')->redirect();
    }

    public function callback(Request $request): Redirector|Application|\Illuminate\Http\RedirectResponse
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

        return redirect()->route('reading-club');
    }
}
