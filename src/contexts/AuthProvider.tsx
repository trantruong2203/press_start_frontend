import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ContextAuth, type AuthContextType } from './AuthContext';
import axios from 'axios';
import type { UserResponse } from '../interface/UserResponse';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [accountLogin, setAccountLogin] = useState<UserResponse | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        try {
            const response = await axios.get(`${API}/users/me`, {
                withCredentials: true
            });
            setAccountLogin(response.data.user);
        } catch (error) {
            console.log(error);
            setAccountLogin(null);
            navigate('/');
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API}/users/logout`, {}, {
                withCredentials: true,
            });
            setAccountLogin(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };


    const authContextValue: AuthContextType = {
        accountLogin,
        logout,
        getToken,
    };

    return (
        <ContextAuth.Provider value={authContextValue}>
            {children}
        </ContextAuth.Provider>
    );
}

export default AuthProvider;