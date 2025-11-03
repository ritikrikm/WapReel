import TopBar from './NavBar/TopBar'
import { FloatingNavBar } from './NavBar/FloatingNavBar'
import Dashboard from './Container/Dashboard'
import Chat from './Container/Chat'
import Reel from './Container/Reel'
import { useSelector } from 'react-redux'

export default function MainContainer() {
    const activeTab = useSelector((state) => state.tab.activeTab)

    const handleLogout = () => {
        // Implement  logout logic here
        console.log('User logged out')
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <Dashboard />
            case 'Chat':
                return <Chat />
            case 'Reel':
                return <Reel />
            default:
                return <Dashboard />
        }
    }

    return (
        <div className="min-h-screen bg-[var(--thistle-2)] flex flex-col items-center justify-center relative">
            <TopBar onLogout={handleLogout} />
            <div className="mt-20 w-full">{renderContent()}</div>
            <FloatingNavBar />
        </div>
    )
}
