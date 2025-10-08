import React, { useState, useEffect, useMemo, useContext } from "react";

import { getUserData, saveUserData, deleteUserData } from "../utils/auth-token";
import Firebase from "../utils/firebase";
import {
  updateUser,
  updateActionsUser,
  deleteUser,
  getUserInfo,
  logout,
} from "../utils/request";
import { useHistory } from "react-router";
import { getSeed, removeSeed } from "../utils/encryption";

const UserContext = React.createContext();
export const firebase = new Firebase();

/**
 * The provider of the user context
 * @component
 * @category context
 * @param {*} props props received from the father
 */
export function UserProvider(props) {
  const history = useHistory();
  const [user, setUser] = useState(null); //no se sabe si hay usuario autenticado

  const [loadingUser, setLoadingUser] = useState(true);
  const [userAdmin, setUserAdmin] = useState(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  /**
   * UseEffect to set the user when the provider mounts
   * @function
   */
  useEffect(() => {
    async function loadUser() {
      const seed = getSeed();
      const userData = getUserData();

      if (!userData) {
        if (seed) {
          removeSeed();
        }
        setLoadingUser(false);
        return;
      }
      if (!seed) {
        if (userData) {
          deleteUserData();
        }
        setLoadingUser(false);
        return;
      }

      setUser({ data: userData, token: userData.accessToken });
      setLoadingUser(false);
    }

    loadUser();
    onStateAuthUser();
  }, []);

  useEffect(() => {
    async function loadAdminInfo() {
      if (user?.data) {
        try {
          const response = await getUserInfo(user.data.uid);
          if (response.data) {
            const userIsAdmin = response.data.user.roles.find(
              (role) => role === "admin"
            );
            // console.log(userIsAdmin);
            setUserAdmin(userIsAdmin || null);
            setLoadingAdmin(false);
          } else {
            setLoadingAdmin(false);
          }
        } catch (error) {
          setLoadingAdmin(false);
          // console.log(error);
        }
      }
    }

    loadAdminInfo();
  }, [user?.data]);

  /**
   * function used to signup the user in the app
   * @function
   * @param {Object} registerData data used to signup the user
   */
  const signupUser = async (registerData) => {
    try {
      const response = await firebase.register(registerData);
      await firebase.generateLinkVerification().catch((err) => {
        throw err;
      });
      saveUserData(response.user);
      setUser({ data: response.user, token: response.user.accessToken });

      return { message: "Ok" };
    } catch (error) {
      throw error;
    }
  };

  /**
   * function used to login in the app
   * @function
   * @param {Object} loginData data received to login in the app
   */
  const loginUser = async (loginData) => {
    return new Promise((resolve, reject) => {
      firebase
        .loginWithEmailAndPassword(loginData)
        .then(({ user }) => {
          // Do not persist user here. Persist only after passing 2FA (if enabled).
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * function used to login the phone number and verify the 2fa sms
   * @param {string} phone phone number
   * @param {*} appVerifier the recaptcha to verify with firebase
   */
  const loginWithPhoneNumber = (phone, appVerifier) => {
    return new Promise((resolve, reject) => {
      firebase
        .loginWithPhone(phone, appVerifier)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * To set the user data in the provider at login
   * @function
   * @param {*} ya token of the user
   */
  const setUserDataLogin = (user) => {
    try {
      saveUserData(user);
      setUser({ data: user, token: user.accessToken });
      return { message: "Ok" };
    } catch (err) {
      new Error(err);
    }
  };

  /**
   * function used to verify the saved information of the firebase user
   * @function
   * @return {Object || null} user data or null
   */
  async function onStateAuthUser() {
    const authStateUser = await firebase.onAuthState();
    if (authStateUser === null) {
      setUser(null);
      setLoadingUser(false);
    }
  }

  /**
   * Function to logout the user from the app
   * @function
   */
  async function logoutUser() {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setUser(null);
    await history.go("/login");
    removeSeed();
    deleteUserData();
    await firebase.signOut();
    history.go(0);
  }

  /**
   * function to change the password with firebase
   * @function
   * @param {{oldPassword: string, newPassword: string}} data  data to change the password
   */
  async function changePassword({ oldPassword, newPassword }) {
    try {
      await firebase.changePassword(oldPassword, newPassword).catch((err) => {
        throw err;
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * function to update the user data and credentials from firebase
   * @function
   * @param {string} uid uid of the user to update
   * @param {Object} data data to update
   */
  const updateCurrentUser = async (uid, data) => {
    try {
      await updateUser(uid, data).catch((err) => {
        throw err;
      });
    } catch (err) {
      throw err;
    }
  };

  /**
   * function to update the 2fa data from firebase
   * @function
   * @param {*} data data of the user
   */
  const updateCurrentActionsUser = async (data, params) => {
    try {
      return await updateActionsUser(
        user.data.uid,
        { data: data },
        params
      ).catch((err) => {
        throw err;
      });
    } catch (err) {
      throw err;
    }
  };

  /**
   * function to remove the user from the database and delete his account
   * @function
   * @param {string} uid the user uid to destroy
   */
  async function destroyUser(uid) {
    try {
      await deleteUser(uid).catch((err) => {
        throw err;
      });
    } catch (err) {
      throw err;
    }
  }

  const value = useMemo(() => {
    return {
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
      userAdmin,
      loadingAdmin,
      firebase,
    };
    // eslint-disable-next-line
  }, [user, loadingUser, userAdmin, loadingAdmin]);

  return <UserContext.Provider value={value} {...props} />;
}

/**
 * Custom hook to use the user context
 * @component
 * @category context
 * @returns {Object} returns the user context as an object
 */
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be inside the provider UserContext");
  }

  return context;
}
