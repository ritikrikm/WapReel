import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SyncOption from './SyncOption'
import { FaInfinity } from 'react-icons/fa'

export default function SyncModal({ show, onClose, onSelect, isResync }) {
    if (!show) return null

    const options = [
        { label: '24 Hours', value: '24h' },
        { label: '2 Days', value: '2d' },
        { label: '5 Years', value: '5y' },
        { label: 'Infinite', value: '∞', icon: <FaInfinity /> },
    ]

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-[var(--ultra-violet)] backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-6 text-center w-[90%] max-w-xs"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg font-semibold text-white mb-3">
                        {isResync
                            ? 'Change Synchronization Duration'
                            : 'Synchronize For'}
                    </h2>
                    <div className="flex flex-col gap-3">
                        {options.map((opt) => (
                            <SyncOption
                                key={opt.value}
                                label={opt.label}
                                icon={opt.icon}
                                onClick={() => onSelect(opt.value)}
                            />
                        ))}
                    </div>
                    <button
                        onClick={onClose}
                        className="mt-5 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
