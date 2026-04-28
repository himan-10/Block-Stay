import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'https://block-stay.onrender.com/api',
        withCredentials: true,
    });

    // Request interceptor removed: httpOnly cookies cannot be read from document.cookie
    // Browser sends the cookie automatically since withCredentials: true is set

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                setUser(null);
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const { data } = await api.get('/auth/me');
                setUser(data);
            } catch (error) {
                if (error.response?.status !== 401) console.error(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        setUser(data);
        return data;
    };

    const register = async (name, email, password, role) => {
        const { data } = await api.post('/auth/register', { name, email, password, role });
        setUser(data);
        return data;
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    const googleLogin = async (token) => {
        const { data } = await api.post('/auth/google', { token });
        setUser(data);
        return data;
    };

    const setAccountRole = async (role) => {
        const { data } = await api.post('/auth/set-role', { role });
        setUser(data);
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, googleLogin, setAccountRole, loading, api }}>
            {children}
        </AuthContext.Provider>
    );
};
