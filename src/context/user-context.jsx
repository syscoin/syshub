import React, { useState, useEffect, useMemo, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import { getToken, setToken, deleteToken } from '../utils/auth-token';
import { login, register } from '../utils/request';

const UserContext = React.createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null); //no se sabe si hay usuario autenticado
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = getToken();
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        
        setUser({ data: decoded, token });
        setLoadingUser(false);
        
      }
      catch (error) {
        console.log(error);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function signupUser(registerData) {
    const response = await register(registerData);
    
    if (response.error) {
      return response;
    }

    const decoded = jwtDecode(response.data.idToken);
    
    setToken(response.data.idToken);
    setUser({ data: decoded, token: response.data.idToken });
    return {message: 'Ok'};
  }

  async function loginUser(loginData) {
    const response = await login(loginData);
    if (response.error) {
      return response;
    }

    const decoded = jwtDecode(response.data.idToken);
    
    setToken(response.data.idToken);
    setUser({ data: decoded, token: response.data.idToken });
    return {message: 'Ok'};
  }

  function logoutUser() {
    setUser(null);
    deleteToken();
  }

  const value = useMemo(() => {
    return ({
      user,
      loadingUser,
      signupUser,
      loginUser,
      logoutUser
    })
  }, [user, loadingUser]);

  return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be inside the provider UserContext');
  }

  return context;
}