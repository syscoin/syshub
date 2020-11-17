import React, {useState, useEffect, useCallback} from "react";
import {useUser} from "../../context/user-context";
import {getUserInfo} from "../../utils/request";

import UserPassForm from "./UserPassForm";
import UserTwoFA from "./2FA/UserTwoFA";
import swal from 'sweetalert2';

export default function UserInfo() {
  const {firebase, user} = useUser();
  const [userInfo, setUserInfo] = useState(null);

  const loadUserInfo = useCallback(async () => {
    try {
      const response = await getUserInfo(user.token, user.data.user_id);
      if (response.data) {
        await setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    loadUserInfo();
    return () => {
      // cleanup
    };
  }, [loadUserInfo]);


  const emailVerification = () => {
    firebase.generateLinkVerification().then(() => {
      swal.fire({title: `Send email to ${user.data.email}`, icon: 'success'});
    }).catch(err => {
      return swal.fire({title: 'Oops...', text: `${err}`, icon: 'error'});
    })
  }

  const onTwoFAChange = async () => {
    await loadUserInfo();
  }

  return (
    <div className="input-form">
      <div className="form-group">
        <label className="big">Email address</label>
        <br/>
        <input
          type="text"
          className="styled"
          value={user.data.email}
          disabled
        />
        {(userInfo && !userInfo?.emailVerified) && (
          <small>
            <p>
              Email is not verified. &nbsp;
              <span
                onClick={emailVerification}
                style={{textDecoration: "underline", cursor: "pointer"}}
              >
                Verify now
              </span>
            </p>
          </small>
        )}
      </div>

      <div className="form-group spacer line"></div>

      <UserPassForm/>

      <div className="form-group spacer line"></div>
      <div className="form-group">
        <label className="big">Two-Factor-Authorization</label>
        <br/>
        {
          userInfo ? (
            <UserTwoFA
              authData={userInfo.authData}
              onTwoFAChange={onTwoFAChange}
              userPhone={userInfo.phoneNumber || false}
            />
            )
            : (
              <p>Loading...</p>
            )
        }


        <small>
          <p>
            Note: Enabling 2FA is REQUIRED to vote on proposals. You can only use one (1) 2FA method. Please choose SMS or Google Authenticator.
          </p>
        </small>
      </div>
    </div>
  );
}
