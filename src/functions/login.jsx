import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from 'react-router-dom';
// import { useJwt } from "react-jwt";
import { jwtDecode } from "jwt-decode";


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [userJwt, setUserJwt] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useUserContext();
    const navigate = useNavigate();

    const getUserDetails = async (userId) => {
      // Make a request to your server to get user details based on userId
      // Replace the following line with the actual API call to fetch user details
      const response = await fetch(process.env.REACT_APP_API_URL + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userJwt}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      };

      const UserData = response.json();
      return UserData;

    };
  
    const login = async (email, password) => {
      setIsLoading(true);
      setError(null);
      // console.log(email, password);
  
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
  
        // console.log("Response status:", result.status);
        console.log("Response data:", data);
  
        if (!result.ok) {
          setIsLoading(false);
          setError(data.message);
        } else {
          // save user to local storage
          localStorage.setItem('user', JSON.stringify(data));

          // set jwt to state
          setUserJwt(data)
          console.log('jwt', userJwt)
          // decode JWT
          const decodedToken = jwtDecode(data.jwt)
          console.log(decodedToken)
  
          // update the user context
          dispatch({ type: 'LOGIN', payload: data });

          // Get user details based on userId
          const userDetails = await getUserDetails(decodedToken.userId);
          console.log('user?', userDetails)
        

          if (userDetails.admin) {
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