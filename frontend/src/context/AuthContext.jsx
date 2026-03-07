import {createContext, useContext, useState, useEffect } from 'react'

//Creates auth container
const AuthContext = createContext(null)

//Provider component
export function AuthProvider({ children }){
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //Check if there is a saved token. UseEffect allows the code to happen outside of rendering. 
    //UseEffect = "Run thsi code when something is happens."
    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if(savedToken){
            setToken(savedToken)
        }
        setIsLoading(false)
    }, [])
    //The array is the count how many times the side effect should run.

    //Login and Logout. Add to react local storage
    const login = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    //Return the auth rapper so that required pages can have access to the token.
    return (
        <AuthContext.Provider value={{token, isLoading, login, logout, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}