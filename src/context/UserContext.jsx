import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import AuthAPI from "../api/AuthAPI.js";

const UserContext = createContext(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false)

    const getProfile = async () => {
        try {
            const response = await AuthAPI.getCurrentUser();
            if (response.status === 200) {
                setUser(response.data);
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    useEffect(() => {
        // getProfile();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                logout,
                refreshUser: getProfile,
                loading,
                setIsDarkMode,
                isDarkMode
            }}
        >
            {children}
        </UserContext.Provider>
    );
};