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

 
  return {
    user,
    user_id: user ? user.user_id : null,
    role: user ? user.role : null,
    fullname: user ? user.fullname : null,    
    token,
    login,
    logout,
    isAuthenticated,
  };
};
