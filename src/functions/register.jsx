import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate()
  
    const register = async (email, password) => {
      setIsLoading(true);
      setError(null);
      console.log(email, password);
  
      try {
        let result = await fetch(
          process.env.REACT_APP_API_URL + "/users/register-account",
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
          
          setIsLoading(false);

          // navigate to login page
          navigate('/login');
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setIsLoading(false);
        setError("An unexpected error occurred during registration");
      }
    };
  
    return { register, isLoading, error };
  };

