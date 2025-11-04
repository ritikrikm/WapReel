import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useSelector } from 'react-redux'
import AuthCard from './components/AuthCard'
import MainContainer from './components/MainContainer'
import ReelsViewer from './components/ReelsViewer/ReelsViewer'
import { reelsMock } from './data/reelsMockData'
function App() {
    const user = useSelector((state) => state.auth.user)

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            user ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <Navigate to="/auth" />
                            )
                        }
                    />
                    <Route
                        path="/auth"
                        element={
                            !user ? <AuthCard /> : <Navigate to="/dashboard" />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !user ? <AuthCard /> : <Navigate to="/dashboard" />
                        }
                    />
                    {/* protection */}
                    <Route
                        path="/dashboard"
                        element={user ? <MainContainer /> : <MainContainer />}
                    />
                    <Route
                        path="/reels"
                        element={<ReelsViewer videos={reelsMock} />}
                    />
                    <Route path="*" element={<h3>404 Page not found</h3>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
