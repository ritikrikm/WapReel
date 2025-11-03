import React, { useState } from 'react'

export default function TrendingCard() {
    const [category, setCategory] = useState('Voice')
    const [open, setOpen] = useState(false)

    const categories = ['Voice', 'Streaming', 'Music']

    const trendingMap = {
        Voice: [
            '#TechTalks',
            '#CodeVibes',
            '#DevSpeaks',
            '#AIandChill',
            '#DesignDebate',
            '#ReactRoom',
            '#NextGenVoice',
            '#CloudTalk',
            '#FullStackSpace',
            '#BuildTogether',
        ],
        Streaming: [
            '#LiveCoding',
            '#TechStream',
            '#DevShow',
            '#PodcastHub',
            '#StreamHub',
            '#FrontendLive',
            '#UIUXSessions',
            '#DailyStream',
            '#StreamTogether',
            '#ChillWithDev',
        ],
        Music: [
            '#LoFiBeats',
            '#CodingGroove',
            '#WorkFlowVibes',
            '#Music4Devs',
            '#ChillZone',
            '#FocusBeats',
            '#SynthLab',
            '#RelaxTunes',
            '#CodeAndChill',
            '#DeepFocus',
        ],
    }

    return (
        <div className="p-5 bg-white rounded-2xl shadow-md relative">
            {/* Title line */}
            <div className="flex items-center justify-center mb-4 text-[var(--dark-slate-gray)] relative">
                <h2 className="font-semibold text-lg">
                    Trending{' '}
                    <span
                        className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium cursor-pointer"
                        style={{ backgroundColor: 'var(--tropical-indigo)' }}
                        onClick={() => setOpen(!open)}
                    >
                        {category}
                    </span>{' '}
                    Channels
                </h2>

                {/* Custom Dropdown */}
                {open && (
                    <ul
                        className="absolute top-10 left-24 bg-white rounded-xl shadow-lg border w-40 py-2 z-50"
                        onMouseLeave={() => setOpen(false)}
                    >
                        {categories.map((cat) => (
                            <li
                                key={cat}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-[var(--thistle-2)] ${
                                    category === cat
                                        ? 'text-[var(--ultra-violet)] font-semibold'
                                        : 'text-gray-700'
                                }`}
                                onClick={() => {
                                    setCategory(cat)
                                    setOpen(false)
                                }}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Trending Hashtags */}
            <ul className="space-y-2 text-sm text-gray-700 mt-2">
                {trendingMap[category].map((tag, index) => (
                    <li
                        key={index}
                        className="hover:text-[var(--ultra-violet)] cursor-pointer transition-colors duration-200"
                    >
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    )
}
