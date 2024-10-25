'use client'

import AuthModal from "@/components/AuthModal";
import PageLoader from "@/components/Loader/PageLoader";
// types
import { Database } from "@/types/database.types";
// supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// react
import { createContext, useContext, useEffect, useState } from "react";
// toast
import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

interface userType {
    id: string;
    username: string;
    email: string;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<userType | null>(null);
    const [authIsReady, setAuthisReady] = useState<boolean>(false)

    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        setAuthisReady(false)
        const fetchUser = async () => {
            try {
                supabase.auth.onAuthStateChange(async (event, session) => {
                    if (session?.user.id) {
                        const { data: profileData, error } = await supabase
                            .from('profiles')
                            .select('id, username, email')
                            .eq('id', session.user.id);

                        if (error) {
                            toast.error(error.message)
                            throw error;
                        }

                        if (profileData && profileData.length > 0) {
                            const { username, email } = profileData[0];
                            setUser({ id: session.user.id, username, email });
                            setAuthisReady(true)
                        } else {
                            setUser(null);
                        }
                        setAuthisReady(true)
                    } else {
                        setAuthisReady(true)
                        setUser(null);
                    }
                });
            } catch (error: any) {
                console.error(error.message);
                toast.error(error.message);
                setAuthisReady(true)
            }
        };
        fetchUser();
    }, []);

    const authContextValue: AuthContextType = { user, setUser };

    if (!authIsReady) return <PageLoader />

    if (!user && authIsReady) {
        return (
            <AuthContext.Provider value={authContextValue}>
                <AuthModal />
            </AuthContext.Provider>
        )
    }

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        toast.error('useAuthContext must be used within an AuthProvider')
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
