//importing libraries
import Router  from 'next/router';
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';


//creating a context for authentication
export const AuthContext = createContext({

    isAuthenticated: false,
    isLoading: true,
    login: () => {},
    logout: () => { }
});

//creating a provider for authentication
//setting the authentication to false
//setting the loading to true
//setting the router
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

//using useEffect to verify the token
//using api call to verify the token
    useEffect(() => {
        if (
        router.pathname !== '/' && 
        router.pathname !== '/home/login' && 
        router.pathname !== '/home/register-test')
        {
            const verifyToken = async () => {
                try {
                    //using api call to verify the token
                    const response = await fetch('https://api.kaspergaupmadsen.no/api/token/verify/', {
                        method: 'POST',
                        credentials: 'include' // Needed to include the HttpOnly cookie in the request
                    });
          
                    if (response.ok) {
                        // If the token is valid, set the authentication to true
                        setIsAuthenticated(true);
                    } else {
                        // If the token is invalid, remove it from the browser
                        setIsAuthenticated(false);
                        Router.push('/');
                    }
                } catch (error) {
                    // If the token is invalid, remove it from the browser
                    setIsAuthenticated(false);
                    Router.push('/');
                }
        
                setIsLoading(false);
            };

            verifyToken();
        }
    }, [router.pathname]);



  
//using api call to logout
    const logout = async () => {
        try {
            const response = await fetch('https://api.kaspergaupmadsen.no/api/logout/', {
            //const response = await fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {

                setIsAuthenticated(false);
                Router.push('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    const login = () => {
        setIsAuthenticated(true);
    };
    
        
//returning the authentication
  return (
    //Using AuthContext.Provider to provide the authentication
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};
