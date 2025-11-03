import { useState } from 'react'
import Login from './Login'
import Register from './Register'
export default function AuthCard() {
    const [isFlipped, setIsFlipped] = useState(false)
    const toggleFlip = () => {
        setIsFlipped(!isFlipped)
    }
    return (
        <section
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: 'var(--thistle-2)' }}
        >
            <div className="relative perspective">
                <div
                    className={`grid transition-transform duration-700 transform-style-preserve-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                    }`}
                >
                    {/* FRONT SIDE → REGISTER */}
                    <div className="backface-hidden col-start-1 row-start-1">
                        <Register onFlip={toggleFlip} />
                    </div>

                    {/* BACK SIDE → LOGIN */}
                    <div className="backface-hidden rotate-y-180 col-start-1 row-start-1">
                        <Login onFlip={toggleFlip} />
                    </div>
                </div>
            </div>
        </section>
    )
}
