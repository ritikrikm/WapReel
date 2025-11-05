import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    selectedPost: null,
    duration: null,
    syncedPosts: {}, // { [postId]: duration }
}

const syncSlice = createSlice({
    name: 'sync',
    initialState,
    reducers: {
        openSyncModal: (state, action) => {
            state.isOpen = true
            state.selectedPost = action.payload
        },
        closeSyncModal: (state) => {
            state.isOpen = false
            state.selectedPost = null
        },
        selectSyncDuration: (state, action) => {
            const duration = action.payload
            const postId = state.selectedPost?.id

            // if already synced and selects ∞ again -> unsync
            if (state.syncedPosts[postId] && duration === '∞') {
                delete state.syncedPosts[postId]
            } else {
                state.syncedPosts[postId] = duration
            }

            state.duration = duration
            state.isOpen = false
        },
    },
})

export const { openSyncModal, closeSyncModal, selectSyncDuration } =
    syncSlice.actions

export default syncSlice.reducer
