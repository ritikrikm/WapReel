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
        <div className="relative min-h-screen bg-[var(--thistle-2)]">
            {/* Subtle gradient overlay for premium feel */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_55%),linear-gradient(to_bottom,_rgba(255,255,255,0.4),_transparent)]" />

            <div className="relative z-10 flex justify-center py-10 px-4 md:px-8">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_minmax(0,1.1fr)] gap-7">
                    {/* LEFT SIDEBAR */}
                    <div className="flex flex-col gap-6">
                        <div className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_26px_65px_rgba(15,23,42,0.11)]">
                            <AvatarCard
                                username={user?.username || 'CoolZoomer'}
                                connections={1200}
                            />
                        </div>

                        <div className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_26px_65px_rgba(15,23,42,0.11)]">
                            <TrendingCard />
                        </div>
                    </div>

                    {/* MIDDLE FEED */}
                    <div className="flex flex-col gap-6">
                        {/* CREATE POST */}
                        <div className="p-5 md:p-6 rounded-3xl border border-white/70 bg-white/85 backdrop-blur-2xl shadow-[0_20px_55px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(15,23,42,0.14)]">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-[var(--ultra-violet)]/10 flex items-center justify-center text-xs font-semibold text-[var(--ultra-violet)]">
                                        {user?.username
                                            ? user.username
                                                  .charAt(0)
                                                  .toUpperCase()
                                            : 'C'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-[var(--dark-slate-gray)]">
                                            {user?.username || 'CoolZoomer'}
                                        </span>
                                        <span className="text-[11px] text-gray-500 tracking-wide">
                                            Share something inspiring today
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <textarea
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                    placeholder="What’s on your mind?"
                                    className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[var(--ultra-violet)]/70 focus:border-transparent resize-none text-sm text-gray-800 placeholder:text-gray-400"
                                    rows={3}
                                />
                                <div className="flex flex-col md:flex-row gap-3 md:items-center">
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) =>
                                            setImageUrl(e.target.value)
                                        }
                                        placeholder="Add an image URL (optional)"
                                        className="flex-1 w-full p-2.5 text-xs md:text-sm border border-gray-200 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[var(--ultra-violet)]/60 focus:border-transparent placeholder:text-gray-400"
                                    />
                                    <button
                                        onClick={handleAddPost}
                                        className="inline-flex items-center justify-center gap-1.5 bg-[var(--ultra-violet)] hover:bg-[var(--poppy)] text-white text-sm font-medium px-4 md:px-5 py-2.5 rounded-2xl transition-colors duration-200 shadow-[0_10px_24px_rgba(88,28,135,0.25)]"
                                    >
                                        <span>Post</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* POSTS SECTION */}
                        <div className="rounded-3xl border border-white/70 bg-white/85 backdrop-blur-2xl shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
                            <Feed />
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="flex flex-col gap-6">
                        <div className="p-5 md:p-6 rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_26px_65px_rgba(15,23,42,0.11)]">
                            <h2 className="font-semibold text-[var(--dark-slate-gray)] text-sm md:text-base tracking-tight">
                                Recent Activity
                            </h2>
                            <ul className="mt-3 text-xs md:text-sm text-gray-600 space-y-2.5">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--ultra-violet)]/70" />
                                    <span>Liked a post by @ui_master</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--ultra-violet)]/70" />
                                    <span>
                                        Commented on “Design Trends 2025”
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--ultra-violet)]/70" />
                                    <span>New follower: @techiequeen</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <FloatingMessageWidget />
            </div>
        </div>
    )
}
