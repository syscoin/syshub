import React from "react";
import {ErrorMessage} from "@hookform/error-message";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {useUser} from "../../../context/user-context";
import {useHistory} from 'react-router';

const schema = yup.object().shape({
  phoneCode: yup.string().required("The verification code is required"),
});

const SMSTwoFAFormLogin = ({userSignInSms}) => {
  const history = useHistory();
  const {setUserDataLogin} = useUser();
  const {register, handleSubmit, errors} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const verifyPhone = async ({phoneCode}) => {
    let {user} = await userSignInSms.confirm(phoneCode).catch(err => {
      throw err
    })
    setUserDataLogin(user)
    history.push('/governance');
  }

  return (
    <div className="input-form">
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
          onClick={handleSubmit(verifyPhone)}>
          Verify
        </button>
      </form>
    </div>
  )
}

export default SMSTwoFAFormLogin;
