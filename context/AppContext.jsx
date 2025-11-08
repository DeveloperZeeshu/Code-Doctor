'use client';

import { createContext, useState } from "react";

export const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    return <AppContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>{children}</AppContext.Provider>
}

