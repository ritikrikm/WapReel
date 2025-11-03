import React from 'react'
import SlideTabs from './SlideTabs'

export const FloatingNavBar = () => {
    return (
        <div className="fixed mb-2 bottom-0 z-50 bg-neutral-100 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
            <SlideTabs />
        </div>
    )
}

export default FloatingNavBar
