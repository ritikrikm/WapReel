import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useSelector } from 'react-redux'
import * as THREE from 'three'
useGLTF.preload('src/assets/690847a3d9d72e80a52957bb.glb')
function AvatarModel({ url }) {
    const { scene } = useGLTF(url || 'src/assets/690847a3d9d72e80a52957bb.glb')
    const group = useRef()
    const { camera } = useThree()

    useEffect(() => {
        if (group.current) {
            const box = new THREE.Box3().setFromObject(group.current)
            const size = new THREE.Vector3()
            const center = new THREE.Vector3()
            box.getSize(size)
            box.getCenter(center)

            const distance = Math.max(size.y * 1.1, 3.2)
            camera.position.set(0, size.y * 0.5, distance)
            camera.lookAt(center.x, center.y * 0.5, center.z)

            const zoomFactor = 3.6
            group.current.scale.setScalar(zoomFactor)
            group.current.position.y -= size.y * 3
        }
    }, [camera])

    return <primitive ref={group} object={scene} />
}

// Handles smooth camera reset *inside* Canvas context
function CameraResetHelper({ controlsRef, shouldReset }) {
    const { camera } = useThree()
    const target = useRef(new THREE.Vector3(0, 1, 0))
    const frontPos = useRef(new THREE.Vector3(0, 1.2, 3))

    useFrame(() => {
        if (shouldReset && controlsRef.current) {
            // Smoothly interpolate camera back
            camera.position.lerp(frontPos.current, 0.05)
            controlsRef.current.target.lerp(target.current, 0.05)
            controlsRef.current.update()

            if (camera.position.distanceTo(frontPos.current) < 0.01) {
                // stop at front
                controlsRef.current.enableRotate = true
            }
        }
    })

    return null
}

export default function Avatar3D({ vibeStatus }) {
    const user = useSelector((state) => state.auth.user)
    const avatarUrl =
        user?.avatarUrl || 'src/assets/690847a3d9d72e80a52957bb.glb'
    const controlsRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [shouldReset, setShouldReset] = useState(false)

    // Wait 1.5s after release, then reset
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                setShouldReset(true)
            }
        }
        document.addEventListener('visibilitychange', handleVisibility)
        return () =>
            document.removeEventListener('visibilitychange', handleVisibility)
    }, [])
    // Delay before reset after release
    useEffect(() => {
        if (!isDragging) {
            const timer = setTimeout(() => setShouldReset(true), 1500)
            return () => clearTimeout(timer)
        } else {
            setShouldReset(false)
        }
    }, [isDragging])
    useEffect(() => {
        const handleLost = (e) => {
            console.log('Context lost too long → reloading Canvas')
            window.location.reload()
        }
        window.addEventListener('webglcontextlost', handleLost)
        return () => window.removeEventListener('webglcontextlost', handleLost)
    }, [])

    return (
        <div className="relative w-full h-48 bg-[var(--thistle)] rounded-xl border-4 border-[var(--ultra-violet)] shadow-xl overflow-hidden">
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#dcd3f7') // subtle backdrop
                    gl.domElement.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault()
                        console.warn(
                            'WebGL context lost. Attempting recovery...'
                        )
                    })
                    gl.domElement.addEventListener(
                        'webglcontextrestored',
                        () => {
                            console.info(
                                'WebGL context restored, forcing re-render'
                            )
                            gl.resetState()
                            // Force R3F to re-render the last frame
                            gl.render(scene, gl.camera || gl._activeCamera)
                        }
                    )
                }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[3, 3, 5]} intensity={1.2} />
                <Suspense fallback={null}>
                    <AvatarModel url={avatarUrl} />
                </Suspense>

                {/*Helper runs inside Canvas safely */}
                <CameraResetHelper
                    controlsRef={controlsRef}
                    shouldReset={shouldReset}
                />

                <OrbitControls
                    ref={controlsRef}
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    onStart={() => setIsDragging(true)}
                    onEnd={() => setIsDragging(false)}
                />
            </Canvas>

            {/* Vibe Emoji */}
            <div className="absolute top-2 right-2 text-3xl p-1 bg-white rounded-full border-2 border-[var(--ultra-violet)]">
                {vibeStatus}
            </div>
        </div>
    )
}
