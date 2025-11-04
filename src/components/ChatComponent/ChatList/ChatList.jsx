import React from 'react'

export default function ChatList({ chats, selectedChatId, onSelect }) {
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Chats</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSelect(chat.id)}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer shadow-sm transition transform hover:scale-105 ${
                            selectedChatId === chat.id
                                ? 'bg-indigo-100 border-2 border-indigo-400'
                                : 'bg-white hover:bg-indigo-50'
                        }`}
                    >
                        {/* Avatar */}
                        <img
                            src={chat.avatar}
                            alt={chat.user}
                            className="w-14 h-14 rounded-full object-cover border border-gray-300"
                        />

                        {/* Name */}
                        <span className="mt-2 text-sm font-medium text-gray-800 text-center">
                            {chat.user}
                        </span>

                        {/*  Unread dot */}
                        {chat.unread && (
                            <span className="absolute top-3 right-3 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
