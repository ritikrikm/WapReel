import TopBar from './NavBar/TopBar'
import { FloatingNavBar } from './NavBar/FloatingNavBar'
import Dashboard from './Container/Dashboard'
import Chat from './ChatComponent/Chat'
import Reel from './Container/Reel'
import { useSelector } from 'react-redux'

export default function MainContainer() {
    const activeTab = useSelector((state) => state.tab.activeTab)

    const handleLogout = () => {
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
        <div className="flex flex-col h-screen w-full bg-[var(--thistle-2)] overflow-hidden">
            <div className="fixed top-0 left-0 w-full z-20">
                <TopBar onLogout={handleLogout} />
            </div>
            <div className="flex-1 mt-[72px] overflow-y-auto">
                {renderContent()}
            </div>
            <div className="fixed bottom-4 w-full flex justify-center z-30">
                <FloatingNavBar />
            </div>
        </div>
    )
}
