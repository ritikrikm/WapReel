import React, { useRef } from 'react'

export const Tab = ({ children, setPosition, onClick, isActive }) => {
    const ref = useRef(null)

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref.current) return
                const { width } = ref.current.getBoundingClientRect()
                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                })
            }}
            onMouseLeave={() => {
                setPosition((prev) => ({ ...prev, opacity: 0 }))
            }}
            onClick={() => {
                if (onClick) onClick(children) // tell parent which tab was clicked
            }}
            className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base rounded-full transition-all duration-300 ${
                isActive
                    ? 'bg-black text-white'
                    : 'text-black hover:bg-gray-200'
            }`}
        >
            {children}
        </li>
    )
}

export default Tab
