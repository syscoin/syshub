import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import Swal from "sweetalert2";

import { useUser } from '../../context/user-context';
import swal from "sweetalert2";

const schema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string()
    .matches(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,'Must include lower, upper, number, special characters and a min length of 8')
    .required(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords does not match').required('You have to confirm your password')
});

/**
 * Component to change the password of the user at profile
 * @component
 * @subcategory Profile
 * @example
 * return (
 *  <UserPassForm />
 * )
 */
function UserPassForm() {
  const { changePassword, logoutUser } = useUser();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [submitting, setSubmitting] = useState(false);

  /**
   * function to change the password using the API
   * @function
   * @param {Object} data data from the change password form
   */
  async function passwordChange(data) {
    setSubmitting(true);
    swal.fire({
      title: 'Verifying',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    try {
      await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
      await Swal.fire({
        title: 'Password changed',
        text:'Please log in again with your new password',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
      await setSubmitting(false);

      await logoutUser();
    } catch (error) {
      Swal.fire({ title: error, icon: 'error' });
      setSubmitting(false);
    }
  }

  return (
    <div className="form-group">
      <label className="big">Password change</label>
      <form onSubmit={handleSubmit(passwordChange)} >
        <div className="form-group">
          <label htmlFor="oldPassword">Old password</label>
          <input
            className="styled"
            name="oldPassword"
            type="password"
            id="oldPassword"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="oldPassword"
            render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New password</label>
          <input
            className="styled"
            name="newPassword"
            type="password"
            id="newPassword"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="newPassword"
            render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm the password</label>
          <input
            className="styled"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
          />
        </div>
        <div className="btn-group">
          <button className="btn btn--blue" disabled={submitting} type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UserPassForm;