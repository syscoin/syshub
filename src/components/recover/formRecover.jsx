import React, {useState, useEffect} from 'react';
import {useUser} from "../../context/user-context";
import swal from 'sweetalert2'

/**
 * Component that renders the recover password form
 * @component
 * @subcategory recover
 * @example
 * return(
 *  <FormRecover />
 * )
 */
const FormRecover = () => {
  const {firebase} = useUser();
  const [email, setEmail] = useState('');
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = firebase.newRecaptchaVerifier('recaptcha', {
      callback: response => {
        setRecaptchaVerified(true)
      },
      error: () => {
        setRecaptchaVerified(false)
      }
    })
    window.recaptchaVerifier.render();
    // eslint-disable-next-line
  }, [])

  /**
   * Function to submit the recover password form
   * @function
   * @param {*} e 
   */
  const submitForm = async (e) => {
    e.preventDefault();
    swal.fire({
      title: 'Submitting',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    firebase.passwordReset(email).then(() => {
      swal.fire({
        icon: 'success',
        title: 'Email sent',
        text: 'We have sent you an email with the steps to recover your password'
      })
    }).catch(err => {
      return swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err}`
      });
    })
    e.target.reset()
  }

  return (
    <form className="input-form centered" onSubmit={submitForm}>
      <input className="styled-round" type="text" placeholder="Email" onChange={(e) => {
        setEmail(e.target.value)
      }}/>

      <div className="input-cont">
        <div id={'recaptcha'} style={{display: 'inline-block'}}/>
      </div>

      <div className="input-cont">
        <button type={'submit'} className="btn btn--blue" disabled={!recaptchaVerified}>Send</button>
      </div>
    </form>
  );

}


export default FormRecover;
