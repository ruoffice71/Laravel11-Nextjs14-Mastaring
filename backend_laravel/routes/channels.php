<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    Log::info(["the user is " => json_encode($user)]);
    return (int) $user->id === (int) $id;
});
