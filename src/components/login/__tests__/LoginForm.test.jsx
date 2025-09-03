import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';

// shared user-context mock imported above

describe('LoginForm', () => {
  test('renders inputs and enables submit after reCAPTCHA mock callback', () => {
    const onLogin = jest.fn();
    render(<LoginForm onLogin={onLogin} submitting={false} />);

    // Inputs present
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    const submitButton = screen.getByText(/Login/i);
    expect(submitButton).toBeEnabled();
  });

  test('validates and submits with email/password', (done) => {
    const onLogin = jest.fn();
    render(<LoginForm onLogin={onLogin} submitting={false} />);

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'user@example.com');
    userEvent.type(screen.getByPlaceholderText(/Password/i), 'secret');

    userEvent.click(screen.getByText(/Login/i));

    setTimeout(() => {
      expect(onLogin).toHaveBeenCalledTimes(1);
      expect(onLogin.mock.calls[0][0]).toEqual({
        email: 'user@example.com',
        password: 'secret'
      });
      done();
    }, 0);
  });

  test('disables submit when submitting prop is true', () => {
    const onLogin = jest.fn();
    render(<LoginForm onLogin={onLogin} submitting={true} />);
    const submitButton = screen.getByText(/Login/i);
    expect(submitButton).toBeDisabled();
  });
});


