import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

import Sidebar from "../../components/layout/Sidebar/Sidebar"

const SidebarWrapper = ({ children }) => {
    const { isSidebarOpen, closeSidebar } = useContext(AppContext)
    return (
        <div className="relative">
            {isSidebarOpen && (
                <div className={`z-50 fixed`}>
                    <Sidebar />
                </div>
            )}

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
                    onClick={closeSidebar}
                />
            )}

            <main className={`transition-all duration-300 ${isSidebarOpen ? 'brightness-50' : ''}`}>
                {children}
            </main>
        </div>
    )
}

export default SidebarWrapper
