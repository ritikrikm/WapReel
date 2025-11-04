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
        <header className="fixed top-0 left-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <h1
                        className="text-lg md:text-xl font-bold tracking-tight"
                        style={{ color: 'var(--ultra-violet)' }}
                    >
                        Nothing
                    </h1>
                    {user && (
                        <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                            | Welcome, {user.name || 'User'}
                        </span>
                    )}
                </div>

                {/* Middle: Search */}
                <div className="relative flex-1 max-w-xs mx-4 hidden md:block">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-full border border-gray-300 px-9 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ultra-violet)] transition-all bg-white/60 backdrop-blur-sm"
                    />
                </div>

                {/* Right: Logout */}
                <div className="flex items-center">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 bg-[var(--poppy)] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-[var(--poppy)]/90 transition-all duration-200"
                    >
                        <FaSignOutAlt className="text-sm" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}
