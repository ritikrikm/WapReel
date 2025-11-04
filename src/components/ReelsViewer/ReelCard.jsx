import React, { useRef, useState, useEffect } from 'react'

const IconHeart = ({ filled }) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
            d="M12 21s-6.716-4.27-9.193-7.313C.603 10.92 1.21 7.5 3.655 6.03 5.39 4.96 7.7 5.3 9 6.87c1.3-1.57 3.61-1.91 5.345-.84 2.445 1.47 3.052 4.89.848 7.657C18.716 16.73 12 21 12 21z"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
)
const IconComment = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
            d="M21 15a4 4 0 0 1-4 4H8l-5 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
)
const IconShare = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
            d="M4 12v8a2 2 0 0 0 2 2h12M16 6l-4-4-4 4M12 2v14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
)
const IconSave = ({ saved }) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
            d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1Z"
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
)

export default function ReelCard({ data, registerVideoRef }) {
    const {
        id,
        videoUrl,
        username,
        caption,
        audioName,
        isLiked: likedInit,
    } = data
    const videoRef = useRef(null)
    const [muted, setMuted] = useState(true)
    const [liked, setLiked] = useState(!!likedInit)
    const [saved, setSaved] = useState(false)
    const [showHeart, setShowHeart] = useState(false)

    useEffect(() => {
        registerVideoRef(id, videoRef.current)
        return () => registerVideoRef(id, null)
    }, [id, registerVideoRef])

    const handleTap = () => setMuted((m) => !m)
    const handleDoubleTap = () => {
        setLiked(true)
        setShowHeart(true)
        setTimeout(() => setShowHeart(false), 600)
    }

    return (
        <div className="relative w-[360px] h-[640px] bg-black overflow-hidden rounded-2xl">
            <video
                ref={videoRef}
                src={videoUrl}
                playsInline
                muted={muted}
                loop
                onClick={handleTap}
                onDoubleClick={handleDoubleTap}
                className="object-cover w-full h-full rounded-2xl"
            />

            {/* heart animation */}
            {showHeart && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <IconHeart filled />
                </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 flex justify-between p-3">
                {/* Left text */}
                <div className="flex flex-col justify-end pb-2 pl-2 space-y-1 text-white text-sm">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">@{username}</span>
                        <button className="px-2 py-1 text-xs bg-white text-black rounded-full">
                            Follow
                        </button>
                    </div>
                    <div className="max-w-[70%] text-xs opacity-90">
                        {caption}
                    </div>
                    <div className="text-[10px] opacity-80">🎵 {audioName}</div>
                </div>

                {/* Right icons */}
                <div className="flex flex-col items-center justify-end gap-3 pb-4 pr-2 text-white">
                    <button
                        onClick={() => setLiked((v) => !v)}
                        className={`p-2 rounded-full ${liked ? 'text-red-500' : 'text-white'}`}
                    >
                        <IconHeart filled={liked} />
                    </button>
                    <button className="p-2">
                        <IconComment />
                    </button>
                    <button className="p-2">
                        <IconShare />
                    </button>
                    <button
                        onClick={() => setSaved((s) => !s)}
                        className={`p-2 ${saved ? 'text-yellow-400' : 'text-white'}`}
                    >
                        <IconSave saved={saved} />
                    </button>
                </div>
            </div>
        </div>
    )
}
