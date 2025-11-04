import React, { useEffect, useRef } from 'react'
import MessageInput from './ChatWindow/MessageInput'

export default function ChatWindow({ chat, onSend }) {
    const messagesEndRef = useRef(null)

    // useEffect(() => {
    //     // only scroll when new message is added, not when switching chats
    //     if (chat.messages.length > 0) {
    //         const lastMessage = chat.messages[chat.messages.length - 1]
    //         if (lastMessage.sender === 'me') {
    //             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    //         }
    //     }
    // }, [chat.messages])

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="border-b px-6 py-4 bg-indigo-100">
                <h2 className="text-xl font-semibold text-gray-800">
                    {chat.user}
                </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {chat.messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${
                            msg.sender === 'me'
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-xs ${
                                msg.sender === 'me'
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
                <MessageInput onSend={(text) => onSend(chat.id, text)} />
            </div>
        </div>
    )
}
