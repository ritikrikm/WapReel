import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from '../../features/postSlice'
import { mockFriends } from '../../data/mockFriends'
import AvatarCard from '../Card/AvatarCard'
import TrendingCard from '../Card/TrendingCard'
import FloatingMessageWidget from '../Container/FloatingMessaging/FloatingMessageWidget'
import Feed from './Feed'
export default function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const [newPost, setNewPost] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleAddPost = () => {
        if (!newPost.trim()) return
        dispatch(
            addPost({
                username: user?.username || 'CoolZoomer',
                caption: newPost,
                image: imageUrl || null,
            })
        )
        setNewPost('')
        setImageUrl('')
    }

    return (
        <div className="relative min-h-screen bg-[var(--thistle-2)] flex justify-center py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl">
                {/* LEFT SIDEBAR */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <AvatarCard
                        username={user?.username || 'CoolZoomer'}
                        connections={1200}
                    />
                    <TrendingCard />
                </div>

                {/* MIDDLE FEED */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    {/* CREATE POST */}
                    <div className="p-4 bg-white rounded-2xl shadow-md flex flex-col gap-3">
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--ultra-violet)] resize-none"
                            rows={2}
                        />
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Optional: Image URL"
                            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ultra-violet)]"
                        />
                        <button
                            onClick={handleAddPost}
                            className="self-end bg-[var(--ultra-violet)] hover:bg-[var(--poppy)] text-white font-medium px-4 py-2 rounded-lg transition"
                        >
                            Post
                        </button>
                    </div>

                    {/* POSTS SECTION */}
                    <Feed />
                </div>
                {/* RIGHT SIDEBAR */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <h2 className="font-semibold text-[var(--dark-slate-gray)]">
                            Recent Activity
                        </h2>
                        <ul className="mt-3 text-sm text-gray-600 space-y-2">
                            <li>• Liked post by @ui_master</li>
                            <li>• Commented on “Design Trends 2025”</li>
                            <li>• New follower: @techiequeen</li>
                        </ul>
                    </div>
                </div>
            </div>
            <FloatingMessageWidget />
        </div>
    )
}
