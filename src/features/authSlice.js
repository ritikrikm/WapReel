import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null, // will store user info, including avatarUrl (glb path)
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload
        },
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        updateAvatar: (state, action) => {
            if (state.user) state.user.avatarUrl = action.payload
        },
    },
})

export const { register, login, logout, updateAvatar } = authSlice.actions
export default authSlice.reducer
