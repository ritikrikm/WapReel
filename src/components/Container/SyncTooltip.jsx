import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SyncTooltip({ show, text }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--ultra-violet)] text-white text-xs px-3 py-1 rounded-full shadow-lg"
                >
                    {text}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
