import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import { FaTimes } from 'react-icons/fa'
import { chatService } from '../../ChatComponent/Chat/ChatService'

export default function FloatingMessageWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [chats, setChats] = useState([])
    const [selectedChatId, setSelectedChatId] = useState(null)
    const [input, setInput] = useState('')

    useEffect(() => {
        const unsubscribe = chatService.subscribe(setChats)
        return unsubscribe
    }, [])

    const selectedChat = chats.find((c) => c.id === selectedChatId)

    const handleSend = () => {
        if (!input.trim() || !selectedChat) return
        chatService.sendMessage(selectedChat.id, { sender: 'me', text: input })
        setInput('')
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
        <motion.div
            layout
            className="fixed bottom-6 right-6 z-50 flex items-end justify-end"
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        >
            <AnimatePresence mode="sync">
                {isOpen ? (
                    <motion.div
                        key="chatbox"
                        layoutId="chat-widget"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                        }}
                        className="bg-[#1c1c1e] text-white w-80 h-[460px] rounded-2xl shadow-xl overflow-hidden flex flex-col"
                    >
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                            <h3 className="font-semibold">
                                {selectedChat ? selectedChat.user : 'Messages'}
                            </h3>
                            <div className="flex items-center gap-3">
                                {selectedChat && (
                                    <button
                                        onClick={() => setSelectedChatId(null)}
                                        className="text-gray-400 hover:text-gray-200 text-sm"
                                    >
                                        ← Back
                                    </button>
                                )}
                                <button onClick={() => setIsOpen(false)}>
                                    <FaTimes size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Chat List View */}
                        {!selectedChat && (
                            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                                {chats.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
                                        No chats yet.
                                        <button
                                            onClick={handleAddChat}
                                            className="mt-3 px-4 py-2 bg-[var(--ultra-violet)] rounded-full text-white text-sm"
                                        >
                                            + New Chat
                                        </button>
                                    </div>
                                ) : (
                                    chats.map((chat) => (
                                        <div
                                            key={chat.id}
                                            onClick={() =>
                                                setSelectedChatId(chat.id)
                                            }
                                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800 cursor-pointer transition"
                                        >
                                            <img
                                                src={chat.avatar}
                                                alt={chat.user}
                                                className="w-10 h-10 rounded-full border border-gray-600"
                                            />
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {chat.user}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {chat.messages.slice(-1)[0]
                                                        ?.text ||
                                                        'No messages yet'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Chat Window View */}
                        {selectedChat && (
                            <>
                                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
                                    {selectedChat.messages.length === 0 ? (
                                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                            No messages found.
                                        </div>
                                    ) : (
                                        selectedChat.messages.map((msg, i) => (
                                            <div
                                                key={i}
                                                className={`flex ${
                                                    msg.sender === 'me'
                                                        ? 'justify-end'
                                                        : 'justify-start'
                                                }`}
                                            >
                                                <div
                                                    className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${
                                                        msg.sender === 'me'
                                                            ? 'bg-[var(--ultra-violet)] text-white'
                                                            : 'bg-gray-700 text-gray-200'
                                                    }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="p-3 border-t border-gray-700">
                                    <div className="flex items-center bg-[#2c2c2e] rounded-full px-3 py-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) =>
                                                setInput(e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' &&
                                                handleSend()
                                            }
                                            placeholder="Type a message..."
                                            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-400"
                                        />
                                        <FiSend
                                            onClick={handleSend}
                                            className="text-gray-400 cursor-pointer hover:text-gray-200 transition"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                ) : (
                    <motion.button
                        key="bubble"
                        layoutId="chat-widget"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                        }}
                        onClick={() => setIsOpen(true)}
                        className="flex items-center justify-between gap-3 bg-[#1c1c1e] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#2a2a2d] transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <FiSend size={18} />
                            <span className="text-sm font-medium">
                                Messages
                            </span>
                        </div>
                        <img
                            src="https://randomuser.me/api/portraits/women/65.jpg"
                            alt="User Avatar"
                            className="w-7 h-7 rounded-full border border-gray-500 object-cover"
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
