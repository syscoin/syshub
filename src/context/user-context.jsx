import React, {useState, useEffect, useMemo, useContext} from 'react';
import jwtDecode from 'jwt-decode';

import {getToken, setToken, deleteToken} from '../utils/auth-token';
import Firebase from '../utils/firebase';
import {register, updateUser, updateActionsUser, deleteUser} from '../utils/request';
import {useHistory} from 'react-router';
import {timer} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

const UserContext = React.createContext();
const firebase = new Firebase();

let clock = timer(0, 400000).pipe(map(t => new Date()), shareReplay(1));

export function UserProvider(props) {
  const history = useHistory();
  const [user, setUser] = useState(null); //no se sabe si hay usuario autenticado
  const [loadingUser, setLoadingUser] = useState(true);

  const refresh = async () => {
    const newTokenRefreshed = await firebase.refreshToken().catch(err => {
      throw err
    })
    const newDecoded = jwtDecode(newTokenRefreshed);
    setToken(newTokenRefreshed);
    setUser({data: newDecoded, token: getToken().token});
    setLoadingUser(false);
  }

  useEffect(() => {
    async function loadUser() {
      const token = getToken();
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const decoded = jwtDecode(token.decryptedToken);
        clock.subscribe(async (f) => {
          console.log(f)
          const dateNow = new Date().getTime();
          if (Math.floor(dateNow / 1000) > decoded.exp) {
            await refresh()
          } else {
            setUser({data: decoded, token: token.token});
            setLoadingUser(false);
          }
        })
      } catch (error) {
        console.log(error);
        setLoadingUser(false);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      await updateUser(getToken().token, uid, data).catch(err => {
        throw err
      })
    } catch (err) {
      throw err
    }
  }

  const updateCurrentActionsUser = async (data) => {
    try {
      return await updateActionsUser(getToken().token, user.data.user_id, {data: data}).catch(err => {
        throw err
      })
    } catch (err) {
      throw err
    }
  }

  async function destroyUser(uid) {
    try {
      await deleteUser(getToken().token, uid).catch(err => {
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
