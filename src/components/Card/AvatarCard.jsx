import React from 'react'
import {
    FaUserFriends,
    FaEye,
    FaChartLine,
    FaArrowUp,
    FaPalette,
} from 'react-icons/fa'

/**
 * A component to display the user's 3D Avatar and core profile statistics.
 * This is designed to be the main element in the top-left of the Dashboard.
 * * NOTE: The 'Avatar3D' component is a placeholder for your actual 3D viewer/model.
 */
const Avatar3D = ({ vibeStatus }) => (
    <div className="relative w-full h-48 bg-[var(--thistle)] rounded-xl flex items-center justify-center border-4 border-[var(--ultra-violet)] shadow-xl">
        {/* Placeholder for the 3D Avatar Model/Viewer */}
        <span className="text-xl font-bold text-[var(--ultra-violet)]">
            [Your 3D Avatar Here]
        </span>

        {/* Vibe Status Indicator - The Gen Z Twist */}
        <div className="absolute top-2 right-2 text-3xl p-1 bg-white rounded-full border-2 border-[var(--ultra-violet)]">
            {vibeStatus}
        </div>

        {/* Customization Button */}
        <button
            className="absolute bottom-2 right-2 p-2 bg-[var(--ultra-violet)] text-white rounded-full text-sm hover:scale-105 transition duration-200"
            aria-label="Customize Avatar"
        >
            <FaPalette className="text-lg" />
        </button>
    </div>
)

export default function AvatarCard({
    username,
    vibeStatus = '🎧', // Default vibe
    connections = 1.2, // Example in K
    profileViews = 450,
    impactScore = 85,
}) {
    // Format numbers for better Gen Z readability (e.g., 1.2K)
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        }
        return num
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* 1. 3D Avatar Section */}
            <Avatar3D vibeStatus={vibeStatus} />

            {/* 2. Profile Details */}
            <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-[var(--ultra-violet)]">
                    {username}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">@GenZUser</p>
            </div>

            {/* 3. Stats Grid (The Views) */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
                <div className="flex flex-col items-center">
                    <FaUserFriends className="text-xl text-[var(--ultra-violet)]" />
                    <span className="font-bold text-lg mt-1 text-[var(--dark-slate-gray)]">
                        {formatNumber(connections)}
                    </span>
                    <span className="text-xs text-gray-500">Connections</span>
                </div>

                <div className="flex flex-col items-center">
                    <FaEye className="text-xl text-[var(--ultra-violet)]" />
                    <span className="font-bold text-lg mt-1 text-[var(--dark-slate-gray)]">
                        {profileViews}
                    </span>
                    <span className="text-xs text-gray-500">Profile Views</span>
                </div>

                <div className="flex flex-col items-center">
                    <FaChartLine className="text-xl text-[var(--ultra-violet)]" />
                    <span className="font-bold text-lg mt-1 text-[var(--dark-slate-gray)] flex items-center">
                        {impactScore}{' '}
                        <FaArrowUp className="ml-1 text-green-500 text-sm" />
                    </span>
                    <span className="text-xs text-gray-500">Impact Score</span>
                </div>
            </div>
        </div>
    )
}
