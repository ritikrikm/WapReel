import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import tabReducer from '../features/tabSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        tab: tabReducer,
    },
})
