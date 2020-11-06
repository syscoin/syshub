import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {useUser} from "../../context/user-context";

const schema = yup.object().shape({
  email: yup.string().email().typeError('Must be a valid email').required(),
  password: yup.string()
    .matches(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/, 'Must include lower, upper, number, special characters and a min length of 8')
    .required()
});

const SignupForm = (props) => {
  const {firebase} = useUser();
  const {register, handleSubmit, errors} = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState('');

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha', {
      callback: (resp) => {
        console.log(resp)
      },
      error: (err) => {
        console.log(err)
      }
    })
    window.recaptchaVerifier.render();
  }, [])

  return (
    <>
      <form className="input-form centered" onSubmit={handleSubmit(props.onSignup)}>
        <input className="styled-round" type="text" name="email" placeholder="Email" ref={register}/>
        <ErrorMessage
          errors={errors}
          name="email"
          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
        />

        <input className="styled-round" type="password" name="password" placeholder="Password" ref={register}/>
        <ErrorMessage
          errors={errors}
          name="password"
          render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}
        />

        <div className="input-cont">
          <div id={'recaptcha'} className="recaptcha" style={{display: 'inline-block'}}/>
        </div>

        <div className="input-cont">
          <button
            className="btn btn--blue"
            type="submit"
            disabled={props.submitting}
          >Sign up
          </button>
        </div>

      </form>
    </>
  )
}

export default SignupForm;
