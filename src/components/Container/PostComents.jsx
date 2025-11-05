import React from 'react'

export default function PostComments({ comments, onViewAll }) {
    if (!comments || comments.length === 0) return null

    return (
        <div className="mt-2 space-y-1 text-left">
            {comments.slice(-2).map((c, idx) => (
                <p key={idx} className="text-sm">
                    <span className="font-semibold">{c.user}:</span> {c.text}
                </p>
            ))}

            {comments.length > 2 && (
                <p
                    className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 transition"
                    onClick={onViewAll}
                >
                    View all {comments.length} comments
                </p>
            )}
        </div>
    )
}
