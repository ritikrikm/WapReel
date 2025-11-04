import React from 'react'
import ReelsViewer from '../ReelsViewer/ReelsViewer'
import { reelsMock } from '../../data/reelsMockData'

export default function Reel() {
    //       useEffect(() => {
    //     const script = document.createElement('script')
    //     script.src = 'https://www.instagram.com/embed.js'
    //     script.async = true
    //     document.body.appendChild(script)
    //   }, [])
    return (
        <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[360px] h-[640px] rounded-2xl overflow-hidden 
                    shadow-2xl border border-gray-700 bg-black text-white"
        >
            <ReelsViewer videos={reelsMock} />
            {/* <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/C7qHnMHLWsl/"
        data-instgrm-version="14"
        style={{
          background: 'black',
          border: 0,
          width: '100%',
          height: '100%',
        }}
      ></blockquote> */}
        </div>
    )
}
