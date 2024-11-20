import { createContext, ReactNode, useState } from "react";
import axios from "axios";
import BASE_URL from "../url";
import { storeToken, storeUserId } from "../Business/localstorage_crud";
interface IAuthContext {
    signIn: Function;
    signOut: Function;
    setAUthentication: Function;
    isAuthenticated: boolean;
}
export interface ILogin {
    username: string;
    password: string;
}
const defaultAuthContext = {
    signIn: (data: ILogin) => console.log(data),
    signOut: () => console.log(),
    setAUthentication: () => console.log(),
    isAuthenticated: false,
};
export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const signIn = async (data: ILogin): Promise<{ success: boolean; message: string; }> => {
        try {
            const res = await axios.post(`${BASE_URL}signin`, data);

            if (res.data.success) {
                const userid = res.data.result.split('!!!@#$')[1];
                storeUserId(userid);
                const token = res.data.result.split('!!!@#$')[0];
                storeToken(token);
                setIsAuthenticated(true);
                alert('Signin successful!');
                return { success: true, message: 'Signin successful!' };
            } else {

                return { success: false, message: res.data.result };
            }
        } catch (error: any) {
            setIsAuthenticated(false);

            const errorMessage =
                error.response?.data?.message || 'An error occurred during sign-in.';
            return { success: false, message: errorMessage };
        }
    };
    const signOut = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };
    const setAUthentication = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };
    return (
        <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, setAUthentication }}>
            {children}
        </AuthContext.Provider>
    );
};