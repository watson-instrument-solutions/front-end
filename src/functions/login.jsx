import { useEffect, useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// hook to manage user login
export const useLogin = () => {
  // State to manage error, userJwt, and loading state
  const [error, setError] = useState(null);
  const [userJwt, setUserJwt] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // Get dispatch function from UserContext
  const { dispatch } = useUserContext();
  // Get navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to fetch user object from the server
  const getUserDetails = async (userId) => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return userData;
  };

  // useEffect to handle user login logic
  useEffect(() => {
    // This will run after the component is mounted or when userJwt changes
    const fetchData = async () => {
      if (userJwt) {
        // Decode JWT
        const decodedToken = jwtDecode(userJwt);

        // Get user details based on userId
        try {
          const userDetails = await getUserDetails(decodedToken.userId);
          console.log('user?', userDetails);

          // if user is an admin, navigate to the admin portal,
          // if non admin user navigate to dashboard
          if (userDetails.admin) {
            console.log('admin login, navigating to admin portal');
            navigate('/admin-portal');
          } else {
            console.log('user login, navigating to dashboard');
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          setError('Failed to fetch user details');
        }

        setIsLoading(false);
      }
    };
    
    fetchData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userJwt, navigate]);

  // Function to handle user login
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

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

      if (!result.ok) {
        setIsLoading(false);
        setError(data.message);
      } else {
        // save user to local storage
        localStorage.setItem('user', JSON.stringify(data));

        // set jwt to state
        setUserJwt(data.jwt);
        // console.log('jwt', userJwt); 

        // update the user context
        dispatch({ type: 'LOGIN', payload: data });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
      setError("An unexpected error occurred during login");
    }
  };
  // Return the login function, loading state, and error state
  return { login, isLoading, error };
};