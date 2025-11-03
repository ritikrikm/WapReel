import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../../features/tabSlice'
import Tab from './Tab'

export const SlideTabs = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.tab.activeTab)

    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    })

    const tabs = ['Dashboard', 'Chat', 'Reel']

    return (
        <ul
            onMouseLeave={() =>
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }))
            }
            className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
        >
            {tabs.map((tab) => (
                <Tab
                    key={tab}
                    setPosition={setPosition}
                    onClick={() => dispatch(setActiveTab(tab))}
                    isActive={activeTab === tab}
                >
                    {tab}
                </Tab>
            ))}
            <Cursor position={position} />
        </ul>
    )
}

const Cursor = ({ position }) => (
    <motion.li
        animate={{ ...position }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
)

export default SlideTabs
