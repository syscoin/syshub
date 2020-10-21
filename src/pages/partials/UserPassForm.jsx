import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from '../../context/user-context';
import SubTitle from "./SubTitle";




export default function UserPassForm() {
  const { user } = useUser();
  const { register, handleSubmit, errors } = useForm();
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  function passwordChange(data) {
    console.log(data)
  }

  return (
    <div className="form-group">
      <label className="big">Password change</label>
      <form onSubmit={handleSubmit(passwordChange)}>
        <div className="form-group">
          <label htmlFor="newPassword">New password</label>
          <input className="styled" type="password" id="newPassword" aria-describedby="newPasswordHelp" />
          <small id="newPasswordHelp" className="form-text text-muted">Your password must have minimum 8 characters</small>
        </div>
        <div className="form-group">
          <label htmlFor="passwordVerification">Verify the password</label>
          <input className="styled" type="password" id="passwordVerification" />
        </div>
        <div className="btn-group">
          <button className="btn btn--blue" disabled={!touched || !isSubmitting}>Update</button>
        </div>
      </form>
    </div>
  );
}
