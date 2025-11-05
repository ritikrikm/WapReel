import React from 'react'

export default function SyncOption({ label, icon, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl 
                       bg-white/15 hover:bg-white/25 
                       text-white font-medium text-sm
                       border border-white/20 
                       transition-all hover:scale-105 shadow-md"
        >
            {icon && <span className="text-base">{icon}</span>}
            {label}
        </button>
    )
}
