import React from "react";
import {ErrorMessage} from "@hookform/error-message";
import * as yup from "yup";
import {useHistory} from "react-router";
import {useUser} from "../../../context/user-context";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {decryptAes} from "../../../utils/encryption";
import {verifyAuthCode} from "../../../utils/twoFaAuthentication";

const schema = yup.object().shape({
  gAuthCode: yup.string().required("The verification code is required"),
});

const GAuthTwoFAFormLogin = ({userSignInGAuth}) => {
  const history = useHistory();
  const {setUserDataLogin} = useUser();
  const {register, handleSubmit, errors} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const verifyGAuth = ({gAuthCode}) => {
    console.log(userSignInGAuth.secret)
    let secret = decryptAes(userSignInGAuth.secret, process.env.REACT_APP_ENCRYPT_KEY_DATA)
    console.log(secret)
    console.log(gAuthCode)
    let h = decryptAes(secret, process.env.REACT_APP_ENCRYPT_KEY_DATA)
    console.log(h)
    let isVerified = verifyAuthCode(h, gAuthCode)
    console.log(isVerified)
    if (isVerified) {
      setUserDataLogin(userSignInGAuth)
      history.push('/governance');
    } else {
      console.log('invalid')
    }
  }
  return (
    <div className="input-form">
      <form>
        <div className="form-group">
          <label htmlFor="gAuthCode">
            Insert the code
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
          onClick={handleSubmit(verifyGAuth)}>
          Verify
        </button>
      </form>
    </div>
  )
}

export default GAuthTwoFAFormLogin;
