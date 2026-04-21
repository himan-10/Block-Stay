import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        if (token) {
            config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
        }
        return config;
    });

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

        const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        if (token) checkLoggedIn();
        else setLoading(false);
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

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, api }}>
            {children}
        </AuthContext.Provider>
    );
};
