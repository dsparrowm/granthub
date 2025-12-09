import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as authService from "@/services/appwrite/auth.service";

export interface User {
    id: string;
    email: string;
    name: string;
    organization?: string;
    role: "applicant" | "admin";
    createdAt?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null; // Keep for backwards compatibility (will be null with Appwrite)
    login: (email: string, password: string) => Promise<User>;
    signup: (email: string, password: string, name: string, organization?: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing Appwrite session on mount
        const checkSession = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Session check error:", error);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const loggedInUser = await authService.login(email, password);
            setUser(loggedInUser);
            return loggedInUser; // Return the user
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const signup = async (
        email: string,
        password: string,
        name: string,
        organization?: string
    ) => {
        try {
            const newUser = await authService.signup({
                email,
                password,
                name,
                organization,
            });
            setUser(newUser);
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            // Still clear local state even if logout fails
            setUser(null);
        }
    };

    if (loading) {
        return null; // Or a loading spinner
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token: null, // Appwrite handles sessions internally
                login,
                signup,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
