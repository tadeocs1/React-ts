import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    register: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const savedAuthState = localStorage.getItem('isAuthenticated');
        return savedAuthState ? JSON.parse(savedAuthState) : false;
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const login = (email: string, password: string) => {
        if (email === 'admin@hotmail.com' && password === 'admin') {
            setIsAuthenticated(true);
            console.log('Login successful');
        } else {
            console.error('Login failed');
            window.alert('Usuario o contraseña incorrectos');
        }
    };

    const register = (email: string, password: string) => {
        console.log(`Registered with email: ${email} and password: ${password}`);
    };

    const logout = () => {
        setIsAuthenticated(false);
        console.log('Logged out');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);