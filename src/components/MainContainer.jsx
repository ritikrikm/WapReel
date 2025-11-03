import { FloatingNavBar } from './NavBar/FloatingNavBar'
import Dashboard from './Container/Dashboard'
import Chat from './Container/Chat'
import Reel from './Container/Reel'
import { useSelector } from 'react-redux'
export default function MainContainer() {
    const activeTab = useSelector((state) => state.tab.activeTab)
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
            {renderContent()}
            <FloatingNavBar />
        </div>
    )
}
