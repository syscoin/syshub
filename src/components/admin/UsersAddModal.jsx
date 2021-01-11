import React from 'react';
import swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { withTranslation } from 'react-i18next';

const UsersAddModal = ({ t, onAddAdmin }) => {
  return (
    <>
      <h3>{t('admin.users.modal.title')}</h3>
      <div className="input-form">
        <form >

        </form>
      </div>
    </>
  )
}

export default withTranslation()(UsersAddModal);
