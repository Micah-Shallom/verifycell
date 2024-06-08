import { createContext, useContext, useState } from "react";

// Create a new context object for status management
export const StatusContext = createContext();

// Custom hook to access the StatusContext
export const useStatusContext = () => useContext(StatusContext);

// StatusProvider component manages status-related state and methods
export const StatusProvider = ({ children }) => {
    // Define states for message and status
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    // State to manage verification reference (this could be moved to a different context if needed)
    const [verificationRef, setVerificationRef] = useState(null);

    // Combine all state values into a single object to provide through the context
    const value = {
        message,
        setMessage,
        status,
        setStatus,
        verificationRef,
        setVerificationRef,
    };

    // Provide status context to the application
    return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};
