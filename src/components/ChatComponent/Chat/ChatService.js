// Simple event system (mocking realtime database)
let listeners = []
let chats = []

export const chatService = {
    getChats() {
        return chats
    },

    subscribe(callback) {
        listeners.push(callback)
        callback(chats)
        return () => {
            listeners = listeners.filter((l) => l !== callback)
        }
    },

    addChat(newChat) {
        chats = [...chats, newChat]
        listeners.forEach((cb) => cb(chats))
    },

    sendMessage(chatId, message) {
        chats = chats.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
        )
        listeners.forEach((cb) => cb(chats))
    },
}
