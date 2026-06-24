import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // -------------------------
  // Get Logged In User
  // -------------------------

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();

      setUser(response.data);

      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // -------------------------
  // Register
  // -------------------------

  const register = async (formData) => {
    try {
      const response = await registerUser(formData);

      toast.success(response.message);

      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);

      throw error;
    }
  };

  // -------------------------
  // Login
  // -------------------------

  const login = async (data) => {
    try {
      const response = await loginUser(data);

      setUser(response.data.user);

      setIsAuthenticated(true);

      toast.success(response.message);

      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);

      throw error;
    }
  };

  // -------------------------
  // Logout
  // -------------------------

  const logout = async () => {
    try {
      const response = await logoutUser();

      setUser(null);

      setIsAuthenticated(false);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message);

      throw error;
    }
  };

  // -------------------------

  const value = {
    user,
    loading,
    isAuthenticated,

    setUser,

    register,
    login,
    logout,

    fetchCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;