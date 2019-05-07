import { PhoneNumberUtil } from 'google-libphonenumber';
import swal from './node_modules/sweetalert';

const phoneUtil = PhoneNumberUtil.getInstance();

const phoneValidation = (phoneNumber, isoCode) => {
  if (phoneNumber == null || isoCode == null) {
    swal({
      title: 'Oops...',
      text: 'Please include both a phone number and country code.',
      icon: 'error'
    });
    return false;
  }

  let userNumber = null;

  try {
    userNumber = phoneUtil.parseAndKeepRawInput(
      phoneNumber,
      isoCode.toUpperCase()
    );
  } catch (e) {
    swal({
      title: 'Oops...',
      text: `${e}`,
      icon: 'error'
    });
    return false;
  }

  if (userNumber == null) {
    swal({
      title: 'Oops...',
      text: 'Please add a phone number and country code.',
      icon: 'error'
    });

    return false;
  }

  if (!phoneUtil.isValidNumber(userNumber)) {
    swal({
      title: 'Oops...',
      text:
        'Invalid format for phone number, please make sure you have given the correct area code in front of your phone number and have given the correct country code.',
      icon: 'error'
    });

    return false;
  }

  if (userNumber !== null) {
    return userNumber;
  }
};

export { phoneValidation };
