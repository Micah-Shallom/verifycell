import { createContext, useContext, useState } from "react";

export const StatusContext = createContext();
export const useStatusContext = () => useContext(StatusContext);

export const StatusProvider = ({children}) => {
    // define states
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    //this should be in a different context file
    const [verificationRef, setVerificationRef] = useState(null);

    const value = {
        message,
        setMessage,
        status,
        setStatus,
        verificationRef,
        setVerificationRef,
    }

    return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
}