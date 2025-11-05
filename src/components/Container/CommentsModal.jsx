import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addComment,
    toggleLike,
    toggleCommentLike,
} from '../../features/postSlice'
import { FaTimes, FaRegHeart, FaHeart } from 'react-icons/fa'

// Helper → format timestamps
const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000)
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ]
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds)
        if (count > 1) return `${count} ${interval.label}s ago`
        if (count === 1) return `1 ${interval.label} ago`
    }
    return 'Just now'
}

export default function CommentsModal({ post, onClose }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const [commentText, setCommentText] = useState('')
    const [replyTo, setReplyTo] = useState(null)
    const [openReplies, setOpenReplies] = useState({}) // track open comments

    const handleAddComment = () => {
        if (!commentText.trim()) return
        dispatch(
            addComment({
                id: post.id,
                text: commentText,
                user: user?.name || 'Guest',
                parentId: replyTo,
            })
        )
        setCommentText('')
        setReplyTo(null)
    }

    const toggleReplies = (commentId) => {
        setOpenReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }))
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white/95 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-[95%] h-[85vh]">
                {/* Left: Media */}
                <div className="md:w-1/2 bg-black flex justify-center items-center">
                    <img
                        src={post.image}
                        alt={post.caption}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right: Comments section */}
                <div className="md:w-1/2 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${post.username}`}
                                alt={post.username}
                                className="w-8 h-8 rounded-full border"
                            />
                            <span className="font-semibold text-gray-800">
                                {post.username}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-800 transition"
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    {/* Scrollable comments */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 text-left">
                        {/* Caption */}
                        <p className="text-sm leading-relaxed">
                            <span className="font-semibold">
                                {post.username}
                            </span>{' '}
                            {post.caption}
                        </p>

                        {/* Comments */}
                        {post.comments.map((c) => (
                            <div
                                key={c.id}
                                className="border-b border-gray-100 pb-2"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-semibold">
                                                {c.user}
                                            </span>{' '}
                                            {c.text}
                                        </p>
                                        <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                            <span>{timeAgo(c.date)}</span>
                                            <span
                                                className="cursor-pointer hover:underline"
                                                onClick={() => setReplyTo(c.id)}
                                            >
                                                Reply
                                            </span>
                                        </div>

                                        {/* Replies */}
                                        {c.replies?.length > 0 && (
                                            <div className="ml-5 mt-2">
                                                {!openReplies[c.id] ? (
                                                    <p
                                                        onClick={() =>
                                                            toggleReplies(c.id)
                                                        }
                                                        className="text-xs text-gray-400 cursor-pointer hover:underline"
                                                    >
                                                        View {c.replies.length}{' '}
                                                        {c.replies.length === 1
                                                            ? 'reply'
                                                            : 'replies'}
                                                    </p>
                                                ) : (
                                                    <div className="border-l pl-3 space-y-2">
                                                        {c.replies.map((r) => (
                                                            <div key={r.id}>
                                                                <p className="text-sm">
                                                                    <span className="font-semibold">
                                                                        {r.user}
                                                                    </span>{' '}
                                                                    {r.text}
                                                                </p>
                                                                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                                                    <span>
                                                                        {timeAgo(
                                                                            r.date
                                                                        )}
                                                                    </span>
                                                                    <span
                                                                        className="cursor-pointer hover:underline"
                                                                        onClick={() =>
                                                                            setReplyTo(
                                                                                c.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Reply
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <p
                                                            onClick={() =>
                                                                toggleReplies(
                                                                    c.id
                                                                )
                                                            }
                                                            className="text-xs text-gray-400 cursor-pointer hover:underline"
                                                        >
                                                            Hide replies
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Like button for each comment */}
                                    <button
                                        className="text-gray-500 hover:text-red-500 transition ml-2"
                                        onClick={() =>
                                            dispatch(
                                                toggleCommentLike({
                                                    postId: post.id,
                                                    commentId: c.id,
                                                })
                                            )
                                        }
                                    >
                                        {c.liked ? (
                                            <FaHeart
                                                size={14}
                                                className="text-red-500"
                                            />
                                        ) : (
                                            <FaRegHeart size={14} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-5 py-3">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">
                                {post.likes} likes • {post.comments.length}{' '}
                                comments
                            </p>
                            <button
                                className="text-sm font-semibold text-[var(--ultra-violet)]"
                                onClick={() => dispatch(toggleLike(post.id))}
                            >
                                {post.liked ? '❤️ Liked' : '🤍 Like'}
                            </button>
                        </div>

                        {/* Add comment input */}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder={
                                    replyTo ? 'Replying...' : 'Add a comment...'
                                }
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none border border-gray-300 rounded-lg px-3 py-1.5"
                            />
                            <button
                                onClick={handleAddComment}
                                className={`text-sm font-semibold ${
                                    commentText
                                        ? 'text-[var(--ultra-violet)]'
                                        : 'text-gray-400'
                                }`}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
