import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from 'react-router-dom';


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useUserContext();
    // const jwt = require('jsonwebtoken');

    const navigate = useNavigate();
    
    // require('dotenv').config();
  
    const login = async (email, password) => {
      setIsLoading(true);
      setError(null);
      console.log(email, password);
  
      try {
        let result = await fetch(
          process.env.REACT_APP_API_URL + "/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
  
        let data = await result.json();
  
        console.log("Response status:", result.status);
        console.log("Response data:", data);
  
        if (!result.ok) {
          setIsLoading(false);
          setError(data.message);
        } else {
          // save user to local storage
          localStorage.setItem('user', JSON.stringify(data));
          
          
  
          // update the user context
          dispatch({ type: 'LOGIN', payload: data });

        

          if (data.admin) {
            console.log('admin login, navigating to admin portal')
            navigate('/admin-portal')
          } else {
            console.log('user login, navigating to dashboard');
            navigate('/dashboard');
          }
          
          setIsLoading(false);
          
          
        }
      } catch (error) {
        console.error("Error during login:", error);
        setIsLoading(false);
        setError("An unexpected error occurred during login");
      }
    };
  
    return { login, isLoading, error };
  };