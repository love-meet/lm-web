import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axios';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [appLoad, setAppLoad] = useState(true)
  const [loadSingleUser, setLoadSingleUser] = useState(true)
  const [preferences, setPreferences] = useState({
    distance: 50,
    unit: 'km',
    city: '',
    country: '',
    showDistance: true
  })

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
        setUser(response);
        // Initialize preferences with user data if available
        if (response.city || response.country || response.distancePreference) {
          setPreferences(prev => ({
            ...prev,
            city: response.city || '',
            country: response.country || '',
            distance: response.distancePreference?.distance || prev.distance,
            unit: response.distancePreference?.unit || prev.unit
          }));
        }
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

    const updatePreferences = async (newPreferences) => {
      try {
        // Update local state immediately for better UX
        setPreferences(prev => ({
          ...prev,
          ...newPreferences
        }));
        
        // Save to server
        const response = await api.put('/user/preferences', newPreferences);
        
        if (response && response.success) {
          // Update user data with the new preferences
          if (response.user) {
            setUser(prev => ({
              ...prev,
              ...response.user
            }));
          }
        } else {
          toast.error('Failed to save preferences');
          // Revert local state on error
          setPreferences(prev => ({
            ...prev,
            ...Object.fromEntries(
              Object.keys(newPreferences).map(key => [key, prev[key]])
            )
          }));
        }
      } catch (error) {
        console.error('Error updating preferences:', error);
        toast.error('Failed to save preferences');
      }
    };

    const getUserById = async (userId) => {
      try {
        setLoadSingleUser(true)
        const response = await api.get(`/auth/user/${userId}`);
          if (response) {
            return response;
          } 
          else {
            toast.error('Failed to fetch user data');
          }
        }
        catch(err){
          toast.error('Failed to fetch user data');
        }
        finally{
          setLoadSingleUser(false)
        }
    }

  return (
    <AuthContext.Provider value={{ appLoad, user, fetchWithGoogle ,
    getUserById,loadSingleUser, handleLogOut, setUser, fetchUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);