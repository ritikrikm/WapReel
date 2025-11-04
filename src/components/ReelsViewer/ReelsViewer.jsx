import React, { useRef, useEffect, useCallback } from 'react'
import ReelCard from './ReelCard'

export default function ReelsViewer({ videos = [] }) {
    const containerRef = useRef(null)
    const videoRefs = useRef(new Map())

    const registerVideoRef = useCallback((id, node) => {
        if (node) videoRefs.current.set(id, node)
        else videoRefs.current.delete(id)
    }, [])

    // IntersectionObserver for autoplay/pause
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target
                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.9
                    ) {
                        video.muted = true
                        video.play().catch(() => {})
                    } else {
                        video.pause()
                    }
                })
            },
            {
                root: containerRef.current,
                threshold: [0, 0.9],
            }
        )

        videoRefs.current.forEach((v) => observer.observe(v))
        return () => observer.disconnect()
    }, [videos])

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory bg-black"
        >
            {videos.concat(videos).map((item, index) => (
                <section
                    key={index}
                    className="snap-start w-full h-full flex justify-center items-center"
                >
                    <ReelCard data={item} registerVideoRef={registerVideoRef} />
                </section>
            ))}
        </div>
    )
}
