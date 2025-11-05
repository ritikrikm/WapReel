import { createSlice } from '@reduxjs/toolkit'
import { mockPosts } from '../data/mockPosts'

const initialState = {
    posts: mockPosts,
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                id: Date.now(),
                username: action.payload.username,
                caption: action.payload.caption,
                image: action.payload.image || null,
                avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${action.payload.username}`,
                likes: 0,
                liked: false,
                saved: false,
                comments: [],
            }
            state.posts.unshift(newPost)
        },
        toggleLike: (state, action) => {
            const post = state.posts.find((p) => p.id === action.payload)
            if (post) {
                post.liked = !post.liked
                post.likes += post.liked ? 1 : -1
            }
        },
        toggleSave: (state, action) => {
            const post = state.posts.find((p) => p.id === action.payload)
            if (post) post.saved = !post.saved
        },
        addComment: (state, action) => {
            const { id, text, user, parentId } = action.payload
            const post = state.posts.find((p) => p.id === id)
            if (!post || !text.trim()) return

            const newComment = {
                id: Date.now(),
                user,
                text,
                likes: 0,
                liked: false,
                replies: [],
                date: new Date().toISOString(),
            }

            if (parentId) {
                const parent = post.comments.find((c) => c.id === parentId)
                if (parent) parent.replies.push(newComment)
            } else {
                post.comments.push(newComment)
            }
        },
        toggleCommentLike: (state, action) => {
            const { postId, commentId, parentId } = action.payload
            const post = state.posts.find((p) => p.id === postId)
            if (!post) return

            const findComment = (list, id) => list.find((c) => c.id === id)
            const target = parentId
                ? findComment(
                      findComment(post.comments, parentId)?.replies || [],
                      commentId
                  )
                : findComment(post.comments, commentId)

            if (target) {
                target.liked = !target.liked
                target.likes += target.liked ? 1 : -1
            }
        },
    },
})

export const {
    addPost,
    toggleLike,
    toggleSave,
    addComment,
    toggleCommentLike,
} = postSlice.actions

export default postSlice.reducer
