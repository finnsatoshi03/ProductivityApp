import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Authentication = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  
  useEffect(() => {
    // Load user and token from AsyncStorage on component mount
    const loadUserAndToken = async () => {
      const userString = await AsyncStorage.getItem('user');
      const tokenString = await AsyncStorage.getItem('token');

      const loadedUser = userString ? JSON.parse(userString) : null;
      const loadedToken = tokenString ? JSON.parse(tokenString) : null;

      setUser(loadedUser);
      setToken(loadedToken);
    };

    loadUserAndToken();
  }, []); // Empty dependency array to run the effect only once on mount

  const login = ({ user, token, user_id, fullname, role }) => {
    setUser(user);
    setToken(token);
    
    // Save user, token, user_id, and role to AsyncStorage
    AsyncStorage.setItem('user', JSON.stringify({ user_id, role, fullname}));
    AsyncStorage.setItem('token', JSON.stringify(token));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    console.log(';yo');
    // Remove user and token from AsyncStorage
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('token');
    
  };

  const isAuthenticated = () => {
    return token !== null && user !== null;
  };

  const userRole = () => {  
    return user.role === 'admin' ? 'admin' : 'user'
  }

  const userFullname = () => {
    return user.fullname
  }

  const getUser = async () => {
    try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            console.log(user);            
            return user; // Return the parsed user object
        } else {
            return null; // Return null if no user data is found
        }
    } catch (error) {
        console.error('Error while getting user data:', error);
        return null; // Return null in case of an error
    }
  };
 
  return {
    user,
    user_id: user ? user.user_id : null,
    role: user ? user.role : null,
    fullname: user ? user.fullname : null,    
    token,
    getUser,
    login,
    logout,
    isAuthenticated,
  };
};
