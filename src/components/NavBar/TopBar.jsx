import React from 'react'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'

export default function TopBar({ onLogout }) {
    return (
        <header className="fixed top-0 left-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                {/* Left: Logo */}
                <h1
                    className="text-md font-bold tracking-tight"
                    style={{ color: 'var(--ultra-violet)' }}
                >
                    Nothing
                </h1>

                {/* Middle: Search */}
                <div className="relative flex-1 mx-4 hidden md:block max-w-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-full border border-gray-300 px-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ultra-violet)] transition-all"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </div>

                {/* Right: Logout Button */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-1 bg-[var(--poppy)]/90 hover:bg-[var(--poppy)] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm transition-all duration-200"
                >
                    <FaSignOutAlt className="text-sm" />
                    Logout
                </button>
            </div>
        </header>
    )
}
