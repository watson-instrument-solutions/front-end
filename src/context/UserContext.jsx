import { createContext, useReducer, useEffect } from 'react';

// Create a new context for managing user state
export const UserContext = createContext();

// Reducer function to handle state changes based on actions
export const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null}
        default:
            return state
    }
}

// UserContextProvider component for managing the user state
export const UserContextProvider = ({ children }) => {
     // Use useReducer to manage state with the userReducer function
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    })
    // useEffect to check for user data in localStorage on component mount
    useEffect(() => {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'))
        // If user data is present, dispatch a LOGIN action to update the state
        if (user) {
            dispatch({ type: 'LOGIN', payload: user})
        }
    }, [])

    // console.log ('UserContext state ', state)
    
    // Provide the UserContext with the current user state and dispatch function
    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}