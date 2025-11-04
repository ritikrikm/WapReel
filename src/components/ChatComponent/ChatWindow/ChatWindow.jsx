import React from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatWindow({ chat, onSend }) {
    return (
        <div className="flex flex-col h-full bg-white shadow-md">
            {/* Header */}
            <div className="border-b px-6 py-4 bg-indigo-100 sticky top-0 z-10">
                <h2 className="text-xl font-semibold text-gray-800">
                    {chat.user}
                </h2>
            </div>

            {/* Scrollable message area */}
            <div className="flex-1 overflow-y-auto">
                <MessageList messages={chat.messages} />
            </div>

            {/* Input */}
            <div className="border-t p-4 bg-gray-50">
                <MessageInput onSend={(text) => onSend(chat.id, text)} />
            </div>
        </div>
    )
}
