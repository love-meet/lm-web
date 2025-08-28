import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axios';

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
      const response = await api.get('/auth/get-student')
      if (response.success) {

      } else {

      }
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        // setstudentData(null);
      } finally {
        setAppLoad(false);
      }
    };

    useEffect(() => {
        // fetchUserData();
    }, []);

    const fetchWithGoogle = (async(data)=>{
      console.log((data))
    })

  return (
    <AuthContext.Provider value={{ appLoad, user, fetchWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);