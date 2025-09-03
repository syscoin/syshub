import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GAuthTwoFAFormLogin from '../GAuthTwoFAFormLogin';

describe('GAuthTwoFAFormLogin', () => {
  test('shows validation error on empty submit', async () => {
    const userSignInGAuth = jest.fn();
    render(<GAuthTwoFAFormLogin userSignInGAuth={userSignInGAuth} />);

    userEvent.click(screen.getByText(/Verify/i));

    expect(await screen.findByText(/verification code is required/i)).toBeInTheDocument();
    expect(userSignInGAuth).not.toHaveBeenCalled();
  });

  test('submits gAuth code value', (done) => {
    const userSignInGAuth = jest.fn();
    render(<GAuthTwoFAFormLogin userSignInGAuth={userSignInGAuth} />);

    userEvent.type(screen.getByLabelText(/Insert the code from google authenticator/i), '654321');

    userEvent.click(screen.getByText(/Verify/i));

    setTimeout(() => {
      expect(userSignInGAuth).toHaveBeenCalledTimes(1);
      expect(userSignInGAuth.mock.calls[0][0]).toEqual({ gAuthCode: '654321' });
      done();
    }, 0);
  });
});


