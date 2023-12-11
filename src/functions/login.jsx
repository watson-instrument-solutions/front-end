import { useState } from "react";
import { useUserContext } from "./useUserContext";


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useUserContext();
  
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
          setError(data.error || "Unknown error");
        } else {
          // save user to local storage
          localStorage.setItem('user', JSON.stringify(data));
  
          // update the user context
          dispatch({ type: 'LOGIN', payload: data });
  
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