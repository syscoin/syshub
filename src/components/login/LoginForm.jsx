import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {useUser} from "../../context/user-context";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

/**
 * Component that renders the form to login in the app
 * @component
 * @subcategory login
 * @param {*} props onLogin, submitting
 * @example
 * const onLogin = () => {}
 * const submitting = false
 * return (
 *  <LoginForm onLogin={onLogin} submitting={submitting} />
 * )
 */
const LoginForm = (props) => {
  const {firebase} = useUser();
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha-login', {
      callback: () => {
        setRecaptchaVerified(true)
      }, error: (err) => {
        setRecaptchaVerified(false)
      }
    })
    window.recaptchaVerifier.render();
    // eslint-disable-next-line
  }, [])

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
          <div id={'recaptcha-login'} className="recaptcha" style={{display: 'inline-block'}}></div>
        </div>

        <div className="input-cont">
          <button
            className="btn btn--blue"
            type="submit"
            disabled={props.submitting || !recaptchaVerified}
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm;
