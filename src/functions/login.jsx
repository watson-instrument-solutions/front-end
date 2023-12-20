import { useEffect, useState } from "react";
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

    fetchData(); // Invoke the function immediately after setting userJwt
  }, [userJwt, navigate]);

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
        console.log('jwt', userJwt); // Note: This might not show the updated value immediately due to asynchronous nature

        // update the user context
        dispatch({ type: 'LOGIN', payload: data });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
      setError("An unexpected error occurred during login");
    }
  };

  return { login, isLoading, error };
};