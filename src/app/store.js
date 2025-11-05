import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import tabReducer from '../features/tabSlice'
import postReducer from '../features/postSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        tab: tabReducer,
        posts: postReducer,
    },
})
