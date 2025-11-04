import React, { useState } from 'react'

export default function MessageInput({ onSend }) {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        onSend(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
                Send
            </button>
        </form>
    )
}
