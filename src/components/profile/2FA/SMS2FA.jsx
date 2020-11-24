import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";
import {useUser} from "../../../context/user-context";
import { window } from "rxjs/operators";

const schema = yup.object().shape({
  phoneCode: yup.string().required("The verification code is required"),
});

const SMSTwoFAFormLogin = ({userSignInSms, recaptchaVerified}) => {
  const { firebase } = useUser();
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // if (typeof window.recaptchaVerifier === 'undefined') {
    //   window.recaptchaVerifier = firebase.newRecaptchaVerifier("recaptcha", {
    //     size: "invisible",
    //     callback: (resp) => {
    //       console.log(resp);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    //   window.recaptchaVerifier.render();
    // }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="input-form">
      <h3>SMS authentication</h3>
      <form>
        <div className="form-group">
          <label htmlFor="phoneCode">
            Insert the code sent to your phone
          </label>
          <input
            className="styled"
            name="phoneCode"
            type="text"
            id="phoneCode"
            ref={register}
          />
          <ErrorMessage
            errors={errors}
            name="phoneCode"
            render={({message}) => (
              <small>
                <p style={{lineHeight: "1.5"}}>{message}</p>
              </small>
            )}
          />
        </div>

        <button
          className="btn btn--blue btn-center"
          disabled={!recaptchaVerified}
          onClick={handleSubmit(userSignInSms)}>
          Verify
        </button>
        
      </form>
    </div>
  )
}

export default SMSTwoFAFormLogin;
