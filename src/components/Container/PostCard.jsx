import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLike, toggleSave, addComment } from '../../features/postSlice'
import {
    FaHeart,
    FaRegHeart,
    FaRegComment,
    FaRegBookmark,
    FaBookmark,
} from 'react-icons/fa'
import PostComments from './PostComents'
import CommentsModal from './CommentsModal'

export default function PostCard({ post }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const [commentText, setCommentText] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleAddComment = () => {
        if (!commentText.trim()) return
        dispatch(
            addComment({
                id: post.id,
                text: commentText,
                user: user?.name || 'Guest',
            })
        )
        setCommentText('')
    }

    return (
        <>
            <div className="max-w-md mx-auto bg-white text-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-200 my-6">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${post.username}`}
                            alt={post.username}
                            className="w-9 h-9 rounded-full border"
                        />
                        <div>
                            <h3 className="font-semibold text-sm">
                                {post.username}
                            </h3>
                            <p className="text-xs text-gray-500">
                                Original post
                            </p>
                        </div>
                    </div>
                    <button className="text-blue-500 text-sm font-medium hover:underline">
                        Follow
                    </button>
                </div>

                {/* Image */}
                <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full object-cover max-h-[480px]"
                />

                {/* Actions */}
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-5 text-lg">
                            <button
                                onClick={() => dispatch(toggleLike(post.id))}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                {post.liked ? (
                                    <FaHeart className="text-red-500" />
                                ) : (
                                    <FaRegHeart className="text-gray-700" />
                                )}
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <FaRegComment className="text-gray-700" />
                            </button>
                        </div>
                        <button
                            onClick={() => dispatch(toggleSave(post.id))}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            {post.saved ? (
                                <FaBookmark className="text-[var(--ultra-violet)]" />
                            ) : (
                                <FaRegBookmark className="text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Likes */}
                    <p className="text-sm font-semibold">{post.likes} likes</p>

                    {/* Caption */}
                    <p className="text-sm mt-1 text-left">
                        <span className="font-semibold">{post.username}</span>{' '}
                        {post.caption}
                    </p>

                    {/* Comments Preview */}
                    <PostComments
                        comments={post.comments}
                        onViewAll={() => setShowModal(true)}
                    />

                    {/* Add Comment */}
                    <div className="flex items-center mt-3 border-t border-gray-200 pt-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
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

            {/* ✅ Comments Modal */}
            {showModal && (
                <CommentsModal
                    post={post}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    )
}
