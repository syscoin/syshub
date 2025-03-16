import { PhoneNumberUtil } from 'google-libphonenumber';
import swal from 'sweetalert2'

const phoneUtil = PhoneNumberUtil.getInstance();

/**
 * function to validate the phone number and return a valid google phone number with its isocode
 * @function
 * @param {*} phoneNumber the phone number of the user
 * @param {*} isoCode the iso code of the country
 * @returns {*} phoneNumber verified or false if is and incorrect phone number
 */
export const phoneValidation = (phoneNumber, isoCode) => {
  let userNumber = null;
  if (!phoneNumber || !isoCode) {
    swal.fire({
      title: 'Oops...',
      text: 'Please include both a phone number and country code.',
      icon: 'error'
    })
    return false;
  }

  try {
    userNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, isoCode.toUpperCase())
  } catch (err) {
    swal.fire({
      title: 'Oops...',
      text: `${err}`,
      icon: 'error'
    })
    return false;
  }

  if (userNumber === null) {
    swal.fire({
      title: 'Oops...',
      text: 'Please add a phone number and country code.',
      icon: 'error'
    });
    return false;
  }

  if (!phoneUtil.isValidNumber(userNumber)) {
    swal.fire({
      title: 'Oops...',
      text: 'Invalid format for phone number, please make sure you have given the correct area code in front of your phone number and have given the correct country code.',
      icon: 'error'
    });
    return false;
  }

  return userNumber;
}
