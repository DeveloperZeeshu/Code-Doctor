'use client';

import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [showLog, setShowLog] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isHamOpen, setIsHamOpen] = useState(false);

    const openLogin = () => {
        setShowLog(true);
        setShowSignUp(false);
        setIsHamOpen(false);
    }

    const openSignUp = () => {
        setShowSignUp(true);
        setShowLog(false);
        setIsHamOpen(false);
    }

    const openHam = () => {
        setIsHamOpen(true);
        setShowLog(false);
        setShowSignUp(false);
    }

    return <AppContext.Provider value={{ showLog, setShowLog, showSignUp, setShowSignUp, openSignUp, openLogin, isHamOpen, setIsHamOpen, openHam }}>
        {children}
    </AppContext.Provider>
}

