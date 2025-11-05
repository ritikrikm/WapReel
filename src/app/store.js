import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import tabReducer from '../features/tabSlice'
import postReducer from '../features/postSlice'
import syncReducer from '../features/syncSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        tab: tabReducer,
        posts: postReducer,
        sync: syncReducer,
    },
})
