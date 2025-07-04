<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\ChatRequest;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function sendMessage(ChatRequest $request)
    {
        $message = Message::create([
            'user_id' => Auth::id(),
            'room_id' => $request->room_id,
            'message' => $request->message,
        ]);
        $message->load('user');

        // Broadcast the event
        broadcast(new MessageSent($message, Auth::user()));

        return response()->json([
            'status' => 'success',
            'message' => 'Message sent successfully',
            'data' => $message
        ], 200);
    }

    public function fetchMessages($room_id)
    {
        $messages = Message::with('user')
            ->where('room_id', $room_id)
            ->orderBy('created_at')
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'sender' => $msg->user->email,
                    'senderName' => $msg->user->name,
                    'text' => $msg->message, 
                    'created_at' => $msg->created_at->toDateTimeString(),
                ];
            });

        return response()->json($messages);
    }
}
