import React, {useState, useEffect} from 'react';
import CustomModal from '../../global/CustomModal';


import {useUser} from "../../../context/user-context";
import GAuthForm from './GAuthForm';
import SMS2FAForm from './SMS2FAForm';

// import { updateUser } from "../../utils/request";


function UserTwoFA({authData, onTwoFAChange}) {
  const {user, updateCurrentActionsUser} = useUser();
  const [openSMS, setOpenSMS] = useState(false);
  const [openGAuth, setOpenGAuth] = useState(false);
  console.log(user)
  const enableSMS = async (data) => {
    let currentUserDataUpdate = {
      gAuth: false
    }
    await updateCurrentActionsUser(currentUserDataUpdate).catch(err => {
      console.log(err)
    })
  }

  const disableSMS = async () => {
    console.log('disable SMS')
    let currentUserDataUpdate = {
      gAuth: false
    }
    await updateCurrentActionsUser(currentUserDataUpdate).catch(err => {
      console.log(err)
    })
  }

  const enableGAuth = async (data) => {
    console.log('enable GAuth');
    let currentUserDataUpdate = {
      gAuth: false
    }
    await updateCurrentActionsUser(currentUserDataUpdate).catch(err => {
      console.log(err)
    })
  }

  const disableGAuth = async () => {
    console.log('disable GAuth')
    let currentUserDataUpdate = {
      gAuth: false
    }
    await updateCurrentActionsUser(currentUserDataUpdate).catch(err => {
      console.log(err)
    })
  }

  const removeSecret = async () => {
    let currentUserDataUpdate = {
      gAuthSecret: null,
      gAuth: false
    }
    await updateCurrentActionsUser(currentUserDataUpdate).catch(err => {
      console.log(err)
    })

  }

  return (
    <>
      <div className="form-group half">
        <label className="big">2FA SMS</label>
        {
          authData.sms ? (
            <div className="indicator">ENABLED</div>
          ) : (
            <div className="indicator red">DISABLED</div>
          )
        }
        {
          !authData.sms && (
            <div className="btn-group">
              <button className="btn btn--blue" onClick={() => setOpenSMS(true)}>
                Enable
              </button>
            </div>
          )
        }
        {
          authData.sms && (
            <div className="btn-group">
              <button className="btn btn--blue-border">
                Change phone
              </button>
              <button className="btn btn--blue-border" onClick={disableSMS}>
                Disable
              </button>
            </div>
          )
        }
      </div>
      <div className="form-group half">
        <label className="big">Google Authenticator</label>
        {
          authData.gAuth ? (
            <div className="indicator">ENABLED</div>
          ) : (
            <div className="indicator red">DISABLED</div>
          )
        }
        {
          !authData.gAuth && (
            <div className="btn-group">
              <button className="btn btn--blue" onClick={() => setOpenGAuth(true)}>
                Enable
              </button>
            </div>
          )
        }
        {
          authData.gAuth && (
            <div className="btn-group">
              <button className="btn btn--blue-border" onClick={removeSecret}>
                Remove secret
              </button>
              <button className="btn btn--blue-border" onClick={disableGAuth}>
                Disable
              </button>
            </div>
          )
        }
      </div>

      <CustomModal
        open={openSMS}
        onClose={() => setOpenSMS(false)}
      >
        <SMS2FAForm SMSAuth={enableSMS}/>
      </CustomModal>
      <CustomModal
        open={openGAuth}
        onClose={() => setOpenGAuth(false)}
      >
        <GAuthForm gAuth={enableGAuth}/>
      </CustomModal>
    </>
  )
}

export default UserTwoFA;
