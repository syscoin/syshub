import React from "react";
import { useUser } from '../../context/user-context';
import UserPassForm from "./UserPassForm";


export default function UserDelete() {
  const {  user  } = useUser();

  return (
    <div className="input-form">
      <div className="form-group spacer line"></div>
      <div className="form-group">
        <label className="big">Delete Account</label>
        <br />
        <div className="indicator red">Your account will be deleted. This action cannot be undone.</div>
        <div className="description">We'll never share your email with anyone else.</div>
        <button className="btn btn--blue">Delete account</button>
      </div>


    </div>
  );
}
