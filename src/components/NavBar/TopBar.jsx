import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/authSlice'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'

export default function TopBar() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header className="fixed top-0 left-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* --- LEFT: LOGO + USER --- */}
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold tracking-tight text-[var(--ultra-violet)]">
                        Nothing
                    </h1>
                    {user && (
                        <span className="hidden sm:block text-sm text-gray-500">
                            Welcome,{' '}
                            <span className="font-medium text-gray-700">
                                {user.name || 'User'}
                            </span>
                        </span>
                    )}
                </div>

                {/* --- MIDDLE: SEARCH --- */}
                <div className="relative flex-1 mx-6 hidden md:block max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-700 bg-white shadow-inner focus:ring-2 focus:ring-[var(--ultra-violet)] focus:border-transparent outline-none transition-all duration-200"
                    />
                </div>

                {/* --- RIGHT: LOGOUT --- */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ultra-violet)] text-white text-sm font-medium shadow-md hover:bg-[var(--ultra-violet)]/90 active:scale-95 transition-all duration-200"
                >
                    <FaSignOutAlt className="text-sm" />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    )
}
