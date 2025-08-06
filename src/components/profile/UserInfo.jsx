import React, { useState, useEffect, useCallback, useMemo } from "react";
import swal from "sweetalert2";
import axios from "axios";

import { useUser } from "../../context/user-context";
import { getUserInfo } from "../../utils/request";

import UserPassForm from "./UserPassForm";
import UserTwoFA from "./2FA/UserTwoFA";

/**
 * Component that shows the user information at profile
 * @component
 * @subcategory Profile
 * @example
 * return (
 *  <UserInfo />
 * )
 */
function UserInfo() {
  const { firebase, user } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  /**
   * function that loads the user info from the api and set it on the state
   * @function
   */
  const loadUserInfo = useCallback(async () => {
    try {
      const response = await getUserInfo(user.data.uid, cancelSource.token);
      if (response.data) {
        await setUserInfo(response.data.user);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [user, cancelSource]);

  /**
   * useEffect that loads the data on mounting and cancel the request when unmounted
   * @function
   */
  useEffect(() => {
    loadUserInfo();
    return () => {
      cancelSource.cancel("The request has been canceled");
    };
  }, [loadUserInfo, cancelSource]);

  /**
   * function to send the verification email
   * @function
   */
  const emailVerification = () => {
    firebase
      .generateLinkVerification()
      .then(() => {
        swal.fire({
          title: `Sent email to ${user.data.email}`,
          icon: "success",
        });
      })
      .catch((err) => {
        return swal.fire({ title: "Oops...", text: `${err}`, icon: "error" });
      });
  };

  /**
   * function that loads the userinfo after a change
   * @function
   */
  const onTwoFAChange = async () => {
    await loadUserInfo();
  };

  return (
    <div className="input-form">
      <div className="form-group">
        <label className="big">Email address</label>
        <br />
        <input
          type="text"
          className="styled"
          value={user.data.email}
          disabled
        />
        {userInfo && !userInfo?.emailVerified && (
          <p className="alert alert-warning align-items-center d-flex justify-content-between mt-2">
            Email is not verified. &nbsp;
            <button className="btn btn-link" onClick={emailVerification}>Verify now</button>
          </p>
        )}
      </div>

      <div className="form-group spacer line"></div>

      <UserPassForm />

      <div className="form-group spacer line"></div>
      <div className="form-group">
        <label className="big">Two-Factor-Authorization</label>
        <br />
        {userInfo ? (
          <UserTwoFA
            authData={userInfo.authData}
            onTwoFAChange={onTwoFAChange}
            userPhone={userInfo.phoneNumber || false}
          />
        ) : (
          <p>Loading...</p>
        )}
        <small>
          <p>
            Note: Enabling 2FA is REQUIRED to vote on proposals. You can only
            use one (1) 2FA method. Although we recommend using Google
            Authenticator you can also choose SMS verification.
          </p>
        </small>
      </div>
    </div>
  );
}

export default UserInfo;
