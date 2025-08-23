import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  
  const [appLoad, setAppLoad] = useState(true)

  const fetchstudentData = async () => {
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
        fetchstudentData();
    }, []);

  return (
    <AuthContext.Provider value={{ appLoad }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);