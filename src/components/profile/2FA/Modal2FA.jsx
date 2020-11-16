import React from 'react';
import CustomModal from "../global/CustomModal";
import swal from "sweetalert2";
import {decryptAes} from "../../utils/encryption";
import {verifyAuthCode} from "../../utils/twoFaAuthentication";
import SMSTwoFAFormLogin from '../../login/SMSTwoFAFormLogin';
import GAuthTwoFAFormLogin from '../../login/GAuthTwoFAFormLogin';

export default function Modal2FA({ user2fa, openModal, closeModal }) {

  return (
    <CustomModal
      open={openModal}
      onClose={closeModal}
    >
      {
        (user2fa.twoFa === true && user2fa.sms === true) && (
          <SMSTwoFAFormLogin />
        )
        
      }
      {
        (user2fa.twoFa === true && user2fa.gAuth === true) && (
          <GAuthTwoFAFormLogin />
        )
        
      }
  
      
    </CustomModal>
  )
}
