import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SMSTwoFAFormLogin from '../SMSTwoFAFormLogin';

// shared user-context mock imported above

describe('SMSTwoFAFormLogin', () => {
  test('shows validation error on empty submit', async () => {
    const userSignInSms = jest.fn();
    render(<SMSTwoFAFormLogin userSignInSms={userSignInSms} />);

    userEvent.click(screen.getByText(/Verify/i));

    // Error message from yup
    expect(await screen.findByText(/verification code is required/i)).toBeInTheDocument();
    expect(userSignInSms).not.toHaveBeenCalled();
  });

  test('submits phone code value', (done) => {
    const userSignInSms = jest.fn();
    render(<SMSTwoFAFormLogin userSignInSms={userSignInSms} />);

    userEvent.type(screen.getByLabelText(/Insert the code sent to your phone/i), '123456');

    userEvent.click(screen.getByText(/Verify/i));

    setTimeout(() => {
      expect(userSignInSms).toHaveBeenCalledTimes(1);
      expect(userSignInSms.mock.calls[0][0]).toEqual({ phoneCode: '123456' });
      done();
    }, 0);
  });
});


