import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axios';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [appLoad, setAppLoad] = useState(true)

  const fetchUserData = async () => {
    try {
      const token = Cookies.get('token'); 
      if (!token) {
        setAppLoad(false);
        return;
      }
      const response = await api.get('/auth/user')
      console.log(response)
      if (response) {
        setUser(response)
      } else {
        toast.error('Failed to fetch user data')
      }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUser(null);
      } finally {
        setAppLoad(false);
      }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchWithGoogle = async (data) => {
      try {
        const response = await api.post('/auth/google', data);
        if (response) {
          setUser(response.user);
          Cookies.set('token', response.token);
          toast.success('Logged in successfully');
          window.location.href = '/feeds';
        } else {
          toast.error('Failed to fetch admin data');
        }
        
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        toast.error('An error occurred during login.');
      }
    };

    const handleLogOut = ()=>{
      Cookies.remove("token")
      setUser(null)
    }

  return (
    <AuthContext.Provider value={{ appLoad, user, fetchWithGoogle , handleLogOut, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);