import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {useState} from 'react';
import {useUser} from "../../../context/user-context";

const schema = yup.object().shape({
  phoneNumber: yup.string().required('Phone number is required')
});
const schema2 = yup.object().shape({
  phoneCode: yup.string().required('The verification code is required')
});

export default function SMS2FAForm({SMSAuth}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });
  const {register: register2, handleSubmit: handleSubmit2, errors: errors2} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema2)
  });

  const sendSMS = (data) => {
    console.log('sent');
    setPhoneNumber(data);
  }

  const auth = (data) => {
    SMSAuth({phoneNumber, ...data});
  }

  return (
    <>
      <h3>2FA SMS</h3>
      <div className="input-form">
        <form>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className="styled"
              name="phoneNumber"
              type="tel"
              id="phoneNumber"
              ref={register}
            />
            <ErrorMessage
              errors={errors}
              name="phoneNumber"
              render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
            />
          </div>
          <button className="btn btn--blue btn-center" onClick={handleSubmit(sendSMS)}>Send SMS</button>
        </form>
      </div>

      <div className="input-form">
        <form>
          <div className="form-group">
            <label htmlFor="phoneCode">Insert the code sent to your phone</label>
            <input
              className="styled"
              name="phoneCode"
              type="text"
              id="phoneCode"
              ref={register2}
            />
            <ErrorMessage
              errors={errors2}
              name="phoneCode"
              render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
            />
          </div>

          <button className="btn btn--blue btn-center" type="submit" onClick={handleSubmit2(auth)}>Verify</button>
        </form>
      </div>
    </>
  )
}
