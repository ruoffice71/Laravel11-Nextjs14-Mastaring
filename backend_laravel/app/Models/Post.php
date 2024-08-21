<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ["user_id", "title", "url", "image_url", "description", "vote", "comment_count"];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->select("id", "name", "profile_image", "username", "email");
    }
}
