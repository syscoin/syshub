import React from "react";
import { useUser } from '../../context/user-context';
import UserPassForm from "./UserPassForm";


export default function UserInfo() {
  const {  user  } = useUser();

  return (
    <div className="input-form">
      <div className="form-group">
        <label className="big">Email address</label>
        <br/>
        <input type="text" className="styled" value={user.data.email} disabled />
      </div>

      <div className="form-group spacer line"></div>
      <UserPassForm />
      <div className="form-group spacer line"></div>

      <div className="form-group">
        <div className="form-group half">
          <label className="big">2FA SMS</label>
          <div className="indicator">ENABLED</div>
          <div className="btn-group">
            <button type="submit" className="btn btn--blue">Enable</button>
            <button type="submit" className="btn btn--blue-border">Disable</button>
          </div>
        </div>
        <div className="form-group half">
          <label className="big">Google Authenticator</label>
          <div className="indicator red">DISABLED</div>
          <div className="btn-group">
            <button type="submit" className="btn btn--blue">Enable</button>
            <button type="submit" className="btn btn--blue-border">Disable</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
