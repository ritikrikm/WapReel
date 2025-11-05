import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'

export default function Feed() {
    const posts = useSelector((state) => state.posts.posts)

    return (
        <div className="flex flex-col items-center">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
