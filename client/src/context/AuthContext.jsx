import { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axios';

// create context
const AuthContext = createContext();

// provider component
export default function AuthProvider ({ children }) {
  const [authState, setAuthState] = useState(false);
  const [authLoading, setLoading] = useState(true);


  // checks if user is logged in on initial load
  useEffect(() => {
    isTokenValid();
  }, []);


  // validates token authenticity on application mount
  const isTokenValid = async () => {
    setLoading(true);

    try {
      // sends request to validate token
      const response = await axiosInstance.post("/auth/check-token");

      // if token is valid
      if (response.status === 200) {
        setAuthState(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setAuthState(false);
      } else {
        console.error("Validation request failed:", error);
      }
    } finally {
      setLoading(false);
    }
  }



  /**
   * Function to login a user with their email and password
   * @param {string} email The user's email.
   * @param {*} password The user's password
   * @returns A promise that resolves when login is successful, or throws an error
   */
  const login = async (email, password) => {
    try {
      // backend server expects an object
      const userDetails = {email, password};
    
      // sends request to validate credentials
      const response = await axiosInstance.post("/user/login", userDetails);

      // if login is successful, the server sends a token
      if(response.status === 200) {
        // sets global auth state to true
        setAuthState(true);
      }

    // if server did not send a token
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };



  /**
   * Registers a new user and logs in the user.
   * @param {Object} userDetails The form details from the register page.
   */
  const register = async (userDetails) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post("/user/register", userDetails);

      // if user is created successfully
      if (response.status === 201) {
        setAuthState(true);
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message);
    
    } finally {
      setLoading(false);
    }
  };


  // Logs user our
  const logout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      setAuthState(false);
    } catch (error) {
      console.error(error.response?.data?.message)
    }
  };


  // values and functions that are accessible globally
  return (
    <AuthContext.Provider value={{
      authState,
      authLoading,
      isTokenValid,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};


// creates hook to use the global functions and values
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};