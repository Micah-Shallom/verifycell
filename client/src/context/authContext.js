import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { setAccessToken, getAccessToken, removeAccessToken } from '../utils/tokenStorage';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('accessToken'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = getAccessToken();
        setIsAuthenticated(!!accessToken);
        console.log(accessToken)
        // login(accessToken, null)

        // Fetch user info from accessToken if needed
    }, []);

    const login = (token, userInfo) => {
        setAccessToken(token);
        setIsAuthenticated(true);
        setUser(userInfo);
    };

    const logout = () => {
        removeAccessToken();
        setIsAuthenticated(false);
        setUser(null);
    };

    const values = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};
