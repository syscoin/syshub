import React, {useState, useEffect, useMemo, useContext} from 'react';
import jwtDecode from 'jwt-decode';

import {getToken, setToken, deleteToken} from '../utils/auth-token';
import Firebase from '../utils/firebase';
import {register, updateUser, updateActionsUser, deleteUser} from '../utils/request';
import {useHistory} from 'react-router';
const UserContext = React.createContext();
export const firebase = new Firebase();


export function UserProvider(props) {
  const history = useHistory();
  const [user, setUser] = useState(null); //no se sabe si hay usuario autenticado
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = getToken();
      if (!token) {
        setLoadingUser(false);
        return;
      }
      const decoded = jwtDecode(token.decryptedToken);
      setUser({data: decoded, token: token.token});
      setLoadingUser(false);
    }

    loadUser();
  }, []);

  const signupUser = async (registerData) => {
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

  const loginUser = async (loginData) => {
    return new Promise((resolve, reject) => {
      firebase.loginWithEmailAndPassword(loginData).then(({user}) => {
        resolve(user)
      }).catch(err => {
        reject(err)
      })
    })
  }

  const loginWithPhoneNumber = (phone, appVerifier) => {
    return new Promise((resolve, reject) => {
      firebase.loginWithPhone(phone, appVerifier)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const setUserDataLogin = ({ya}) => {
    try {
      const decoded = jwtDecode(ya);
      setToken(ya);
      setUser({data: decoded, token: getToken().token});

      return {message: 'Ok'};
    } catch (err) {
      new Error(err)
    }
  }

  async function logoutUser() {
    setUser(null);
    deleteToken();
    await history.go('/login');
    await firebase.signOut();
    history.go(0);
  }

  async function changePassword({oldPassword, newPassword}) {
    try {
      await firebase.changePassword(oldPassword, newPassword).catch(err => {
        throw err
      });

    } catch (error) {
      throw error;
    }
  }

  const updateCurrentUser = async (uid, data) => {
    try {
      await updateUser(uid, data).catch(err => {
        throw err
      })
    } catch (err) {
      throw err
    }
  }

  const updateCurrentActionsUser = async (data) => {
    try {
      return await updateActionsUser(user.data.user_id, {data: data}).catch(err => {
        throw err
      })
    } catch (err) {
      throw err
    }
  }

  async function destroyUser(uid) {
    try {
      await deleteUser(uid).catch(err => {
        throw err
      })
    } catch (err) {
      throw err
    }
  }

  const value = useMemo(() => {
    return ({
      user,
      loadingUser,
      signupUser,
      loginUser,
      setUserDataLogin,
      loginWithPhoneNumber,
      logoutUser,
      changePassword,
      updateCurrentUser,
      updateCurrentActionsUser,
      destroyUser,
      firebase
    })
    // eslint-disable-next-line
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
