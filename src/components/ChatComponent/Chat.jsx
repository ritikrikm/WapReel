import React, { useState, useEffect } from 'react'
import ChatList from './ChatList/ChatList'
import ChatWindow from './ChatWindow/ChatWindow'
import { chatService } from './Chat/ChatService'

export default function Chat() {
    const [chats, setChats] = useState([])
    const [selectedChatId, setSelectedChatId] = useState(null)

    useEffect(() => {
        const unsubscribe = chatService.subscribe(setChats)
        return unsubscribe
    }, [])

    const selectedChat = chats.find((c) => c.id === selectedChatId)

    const handleSelectChat = (id) => setSelectedChatId(id)

    const handleSendMessage = (chatId, text) => {
        chatService.sendMessage(chatId, { sender: 'me', text })
    }

    const handleAddChat = () => {
        const id = Date.now()
        const randomAvatar = `https://randomuser.me/api/portraits/${
            Math.random() > 0.5 ? 'men' : 'women'
        }/${Math.floor(Math.random() * 70)}.jpg`

        chatService.addChat({
            id,
            user: `Friend ${id.toString().slice(-3)}`,
            avatar: randomAvatar,
            messages: [],
            unread: false,
            participants: ['me@example.com', `friend${id}@example.com`],
        })
    }

    return (
        <div className="flex h-full w-full bg-gray-50">
            {/* ✅ Left Panel: Chat List */}
            <div
                className={`flex flex-col w-1/3 border-r border-gray-300 ${
                    chats.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'
                }`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="font-semibold text-lg text-gray-700">
                        Chats
                    </h2>
                    <button
                        onClick={handleAddChat}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                        + New
                    </button>
                </div>

                {/* Chat List Items */}
                <ChatList
                    chats={chats}
                    selectedChatId={selectedChatId}
                    onSelect={handleSelectChat}
                />
            </div>

            {/* ✅ Right Panel: Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <ChatWindow
                        chat={selectedChat}
                        onSend={handleSendMessage}
                    />
                ) : (
                    <div className="flex flex-1 items-center justify-center text-gray-500">
                        Select a conversation to start chatting 💬
                    </div>
                )}
            </div>
        </div>
    )
}
