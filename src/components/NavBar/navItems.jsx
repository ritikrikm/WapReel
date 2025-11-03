import { MessageCircle, PlayCircle } from 'lucide-react'
const navItems = [
    {
        id: 'chat',
        label: 'Chat',
        icon: <MessageCircle className="w-5 h-5" />,
        path: '/dashboard/chat',
    },
    {
        id: 'reel',
        label: 'Reel',
        icon: <PlayCircle className="w-5 h-5" />,
        path: '/dashboard/reels',
    },
    // Add more items easily:
    // { id: 'profile', label: 'Profile', icon: <User />, path: '/dashboard/profile' },
]
export default navItems
