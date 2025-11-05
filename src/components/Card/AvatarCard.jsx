import React from 'react'
import { FaUserFriends, FaEye, FaChartLine, FaArrowUp } from 'react-icons/fa'
import Avatar3D from '../Avatar/Avatar3D'

export default function AvatarCard({
    username,
    vibeStatus = '🎧',
    connections = 1.2,
    profileViews = 450,
    impactScore = 85,
}) {
    const formatNumber = (num) =>
        num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num

    return (
        <div className="w-full max-w-sm p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* 3D Avatar */}
            <Avatar3D vibeStatus={vibeStatus} />

            {/* User Details */}
            <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-[var(--ultra-violet)]">
                    {username}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">@GenZUser</p>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
                <Stat
                    icon={<FaUserFriends />}
                    label="Connections"
                    value={formatNumber(connections)}
                />
                <Stat
                    icon={<FaEye />}
                    label="Profile Views"
                    value={profileViews}
                />
                <Stat
                    icon={<FaChartLine />}
                    label="Impact Score"
                    value={
                        <>
                            {impactScore}
                            <FaArrowUp className="ml-1 text-green-500 text-sm inline" />
                        </>
                    }
                />
            </div>
        </div>
    )
}

function Stat({ icon, label, value }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-xl text-[var(--ultra-violet)]">{icon}</div>
            <span className="font-bold text-lg mt-1 text-[var(--dark-slate-gray)]">
                {value}
            </span>
            <span className="text-xs text-gray-500">{label}</span>
        </div>
    )
}
