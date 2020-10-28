import React from 'react';
import { useUser } from "../../context/user-context";
// import { updateUser } from "../../utils/request";

function UserTwoFA({userInfo}) {
  const { user } = useUser();


  const enableSMS = () => {

  }
  
  const enableGAuth = () => {

  }
  return (
    <>
      <div className="form-group half">
        <label className="big">2FA SMS</label>
        <div className="indicator">ENABLED</div>
        <div className="btn-group">
          <button type="submit" className="btn btn--blue">
            Enable
          </button>
          <button type="submit" className="btn btn--blue-border">
            Disable
          </button>
        </div>
      </div>
      <div className="form-group half">
        <label className="big">Google Authenticator</label>
        <div className="indicator red">DISABLED</div>
        <div className="btn-group">
          <button type="submit" className="btn btn--blue">
            Enable
          </button>
          <button type="submit" className="btn btn--blue-border">
            Disable
          </button>
        </div>
      </div>
    </>
  )
}

export default UserTwoFA;
