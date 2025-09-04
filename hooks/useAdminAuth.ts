
import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'pasalka_admin_auth';

const useAdminAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        try {
            const item = window.localStorage.getItem(AUTH_KEY);
            return item ? JSON.parse(item) : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(AUTH_KEY, JSON.stringify(isAuthenticated));
        } catch (error) {
            console.error(error);
        }
    }, [isAuthenticated]);

    const login = useCallback(() => setIsAuthenticated(true), []);
    const logout = useCallback(() => setIsAuthenticated(false), []);

    return { isAuthenticated, login, logout };
};

export default useAdminAuth;
