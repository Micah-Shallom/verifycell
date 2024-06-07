import { createContext, useContext, useState } from "react";

export const StatusContext = createContext();
export const useStatusContext = () => useContext(StatusContext);

export const StatusProvider = ({children}) => {
    // define states
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    //this should be in a different context file
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [verificationRef, setVerificationRef] = useState(null);
    const [user, setUser] = useState(null);

    const value = {
        message,
        setMessage,
        status,
        setStatus,
        isAuthenticated,
        setIsAuthenticated,
        verificationRef,
        setVerificationRef,
        user,
        setUser,
    }

    return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
}