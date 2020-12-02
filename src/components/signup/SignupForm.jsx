import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {useUser} from "../../context/user-context";

const schema = yup.object().shape({
  email: yup.string().email().typeError('Must be a valid email').required('Email is required'),
  password: yup.string()
    .matches(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/, 'Must include lower, upper, number, special characters and a min length of 8')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords does not match')
    .required('You have to confirm your password')
});

/**
 * Component that renders the signup form
 * @component
 * @subcategory signup
 * @param {*} props props onSignup and submitting
 */
const SignupForm = (props) => {
  const {firebase} = useUser();
  const {register, handleSubmit, errors} = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha', {
      callback: () => {
        setRecaptchaVerified(true)
      },
      error: (err) => {
        setRecaptchaVerified(false)
      }
    })
    window.recaptchaVerifier.render();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <form className="input-form centered" onSubmit={handleSubmit(props.onSignup)}>
        <div className="form-group">
          <input
            className="styled-round"
            style={{marginBottom: '0'}}
            type="email"
            name="email"
            placeholder="Email"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({message}) => <small><p style={{lineHeight: '1.5', textAlign: 'center'}}>{message}</p></small>}
          />
        </div>

        <div className="form-group">
          <input
            className="styled-round"
            style={{marginBottom: '0'}}
            type="password"
            name="password"
            placeholder="Password"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({message}) => <small><p style={{lineHeight: '1.5', textAlign: 'center'}}>{message}</p></small>}
          />
        </div>

        <div className="form-group">
          <input
            className="styled-round"
            style={{marginBottom: '0'}}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({message}) => <small><p style={{lineHeight: '1.5', textAlign: 'center'}}>{message}</p></small>}
          />
        </div>

        <div className="input-cont">
          <div id={'recaptcha'} className="recaptcha" style={{display: 'inline-block'}}/>
        </div>

        <div className="input-cont">
          <button
            className="btn btn--blue"
            type="submit"
            disabled={props.submitting || !recaptchaVerified}
          >Sign up
          </button>
        </div>

      </form>
    </>
  )
}

export default SignupForm;
