import React, {useState, useEffect, useMemo, useContext} from 'react';
import jwtDecode from 'jwt-decode';

import {getToken, setToken, deleteToken} from '../utils/auth-token';
import Firebase from '../utils/firebase';
import {register} from '../utils/request';

const UserContext = React.createContext();
const firebase = new Firebase();


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
        const dateNow = new Date().getTime();
        const decoded = jwtDecode(token.decryptedToken);
        if (Math.floor(dateNow / 1000) > decoded.exp) {
          const newTokenRefreshed = await firebase.refreshToken().catch(err => {
            throw err
          })
          const newDecoded = jwtDecode(newTokenRefreshed);
          setToken(newTokenRefreshed);
          setUser({data: newDecoded, token: getToken().token});
        } else {
          setUser({data: decoded, token: token.token});
          setLoadingUser(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function signupUser(registerData) {
    try {
      const response = await firebase.register(registerData);
      await register({uid: response.user.uid}).catch(err => {
        throw err
      });

      const decoded = jwtDecode(response.user.ya);
      setToken(response.user.ya);
      setUser({data: decoded, token: getToken().token});

      return {message: 'Ok'};
    } catch (error) {
      throw error;
    }

  }

  async function loginUser(loginData) {
    try {
      const response = await firebase.loginWithEmailAndPassword(loginData);

      const decoded = jwtDecode(response.user.ya);
      setToken(response.user.ya);
      setUser({data: decoded, token: getToken().token});

      return {message: 'Ok'};
    } catch (error) {
      throw error;
    }
  }

  async function logoutUser() {
    setUser(null);
    deleteToken();
    await firebase.signOut();
  }

  const value = useMemo(() => {
    return ({
      user,
      loadingUser,
      signupUser,
      loginUser,
      logoutUser,
      firebase
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
