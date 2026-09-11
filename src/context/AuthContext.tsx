import {createContext,useContext, useState, useEffect,} from "react";
import type { ReactNode } from "react";

interface Role {
    id: number;
    role_name: string;
}

interface User {
    id: number;
    full_name: string;
    email?: string;
    username?: string;
    role?: Role;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string, userData: User) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    // Restore login after browser refresh
    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            try {
                const parsedUser: User = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Invalid saved user:", error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);
                setIsAuthenticated(false);
            }
        }

        setLoading(false);
    }, []);

    // Login
    const login = async (token: string,userData: User): Promise<void> => {
        localStorage.setItem("token", token);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
        setIsAuthenticated(true);
    };

    // Logout
    const logout = (): void => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
};