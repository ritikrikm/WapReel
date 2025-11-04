import React, { useEffect, useRef } from 'react'

export default function MessageList({ messages }) {
    const messagesEndRef = useRef(null)

    useEffect(() => {
        // scroll only on new messages, not on mount
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    return (
        <div className="p-6 space-y-3">
            {messages.map((msg, i) => (
                <div
                    key={i}
                    className={`flex ${
                        msg.sender === 'me' ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                        className={`px-4 py-2 rounded-lg max-w-xs break-words ${
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
    )
}
