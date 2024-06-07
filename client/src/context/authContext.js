import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setAccessToken, getAccessToken, removeAccessToken } from '../tokenStorage';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('accessToken'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getAccessToken();
        setIsAuthenticated(!!accessToken);
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
        navigate('/');
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
