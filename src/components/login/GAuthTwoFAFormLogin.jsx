import React from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";


const schema = yup.object().shape({
  gAuthCode: yup.string().required("The verification code is required"),
});

const GAuthTwoFAFormLogin = ({userSignInGAuth, verifyGAuth}) => {
  const {register, handleSubmit, errors} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  
  return (
    <div className="input-form article">
      <form>
        <div className="form-group">
          <label htmlFor="gAuthCode">
            Insert the code from google authenticator
          </label>
          <input
            className="styled"
            name="gAuthCode"
            type="text"
            id="gAuthCode"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="gAuthCode"
            render={({message}) => (
              <small>
                <p style={{lineHeight: "1.5"}}>{message}</p>
              </small>
            )}
          />
        </div>

        <button
          className="btn btn--blue btn-center"
          onClick={handleSubmit(userSignInGAuth)}>
          Verify
        </button>
      </form>
    </div>
  )
}

export default GAuthTwoFAFormLogin;
