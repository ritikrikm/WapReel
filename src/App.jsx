import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AuthCard from './components/AuthCard'
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
                        element={user ? <Dashboard /> : <Navigate to="/auth" />}
                    />
                    <Route path="*" element={<h3>404 Page not found</h3>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
