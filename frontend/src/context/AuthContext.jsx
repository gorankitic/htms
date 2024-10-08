// hooks
import { createContext, useEffect, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
    user: null
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return { user: action.payload }
        case "logout":
            return { user: null }
        default: {
            return state;
        }
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // To keep user logged in on hard reload put user object to localStorage after logged in
    // Not great idea to put sensitive info in localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: "login", payload: user });
        }
    }, []);

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used inside an AuthContextProvider');
    }

    return context;
}