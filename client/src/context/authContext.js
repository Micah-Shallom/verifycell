import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { setAccessToken, getAccessToken, removeAccessToken } from '../utils/tokenStorage';

// Create a new context object for authentication
export const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuthContext = () => useContext(AuthContext);

// AuthProvider component manages authentication state and methods
export const AuthProvider = ({ children }) => {
    // State to track if user is authenticated based on presence of accessToken in cookies
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('accessToken'));

    // State to store user info retrieved from cookies
    const [user, setUser] = useState(() => {
        const savedUser = Cookies.get('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // useEffect hook to initialize authentication state and user info on component mount
    useEffect(() => {
        // Check if there's an access token stored in cookies
        const accessToken = getAccessToken();
        setIsAuthenticated(!!accessToken);

        // Retrieve user data from cookies
        const savedUser = Cookies.get('user');
        setUser(savedUser ? JSON.parse(savedUser) : null);

        // You can fetch additional user info from the accessToken if needed
    }, []);

    // Function to login user
    const login = (token, userInfo) => {
        // Set access token in local storage and cookies
        setAccessToken(token);
        Cookies.set("user", JSON.stringify(userInfo), { secure: true, sameSite: 'Strict' });

        // Update state to reflect authentication
        setIsAuthenticated(true);
        setUser(userInfo);
    };

    // Function to logout user
    const logout = () => {
        // Remove access token from storage and cookies
        removeAccessToken();
        setIsAuthenticated(false);
        Cookies.remove("user");

        // Clear user state
        setUser(null);
    };

    // Values object containing authentication state and methods
    const values = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
    };

    // Provide authentication context to the application
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};
