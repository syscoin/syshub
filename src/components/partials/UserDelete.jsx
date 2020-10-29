import React from "react";
import Swal from "sweetalert2";
import { useUser } from '../../context/user-context';
import { deleteUser } from '../../utils/request';

export default function UserDelete() {
  const { user, logoutUser } = useUser();
  
  const deleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Your account will be deleted.',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete my account'
    })
    if (result.isConfirmed) {
      try {
        await deleteUser(user.token, user.data.user_id);
        await Swal.fire({
          title: 'Deleted',
          text: "Your account has been deleted",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        await logoutUser();
      } catch (error) {
        Swal.fire({
          title: 'There was an error',
          text: error,
          icon: 'error',
        });
        console.log(error);
      }
    }

  }

  return (
    <div className="input-form">
      <div className="form-group spacer line"></div>
      <div className="form-group">
        <label className="big">Delete Account</label>
        <br />
        <div className="indicator red">Your account will be deleted. This action cannot be undone.</div>
        <div className="description">We'll never share your email with anyone else.</div>
        <button className="btn btn--blue" onClick={deleteAccount}>Delete account</button>
      </div>


    </div>
  );
}
