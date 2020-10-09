import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });


  return (
    <>
      <form className="input-form centered" onSubmit={handleSubmit(props.onLogin)}>
        <input className="styled-round" type="text" name="email" placeholder="Email" ref={register} />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}
        />

        <input className="styled-round" type="password" name="password" placeholder="Password" ref={register} />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p>{message}</p>}
        />
        
        <div className="input-cont">
          Captcha
        </div>

        <div className="input-cont">
          <button
            className="btn btn--blue"
            type="submit"
            disabled={props.submitting}
          >Login</button>
        </div>

      </form>
    </>
  )
}

export default LoginForm;
