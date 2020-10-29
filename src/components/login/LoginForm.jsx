import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {useUser} from "../../context/user-context";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const LoginForm = (props) => {
  const {firebase, loginWithPhoneNumber} = useUser();
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
  });
  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha')
    window.recaptchaVerifier.render()
  }, [])


  const sendSms = async () => {
    let a = await firebase.sendSMSToPhone('+584146132907', window.recaptchaVerifier).catch(err => {
      throw err
    })
    console.log(a)
  }

  const loginPhone = async () => {
    let r = await loginWithPhoneNumber('+584146132907', window.recaptchaVerifier).catch(err => {
      throw err
    })
    console.log(r)
    let x = await r.confirm('123456').catch(err => {
      throw err
    })
    /** aqui obtienes los datos para el login **/
    console.log(x)
  }

  return (
    <>
      <form className="input-form centered" onSubmit={handleSubmit(props.onLogin)}>
        <input className="styled-round" type="text" name="email" placeholder="Email" ref={register}/>
        <ErrorMessage
          errors={errors}
          name="email"
          render={({message}) => <p>{message}</p>}
        />

        <input className="styled-round" type="password" name="password" placeholder="Password" ref={register}/>
        <ErrorMessage
          errors={errors}
          name="password"
          render={({message}) => <p>{message}</p>}
        />

        <div className="input-cont">
          <div id={'recaptcha'} className="recaptcha" style={{display:'inline-block'}}/>
        </div>

        <div className="input-cont">
          <button
            className="btn btn--blue"
            type="submit"
            disabled={props.submitting}
          >Login
          </button>
        </div>
      </form>
      <button className="btn btn--blue" type={'button'} onClick={sendSms}> send Sms</button>
      <button className="btn btn--blue" type={'button'} onClick={loginPhone}> login Phone</button>
    </>
  )
}

export default LoginForm;
