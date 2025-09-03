// Shared mock for user-context used across tests
jest.mock('../context/user-context', () => ({
  useUser: () => ({
    firebase: {
      newRecaptchaVerifier: jest.fn((id, config) => {
        if (config && typeof config.callback === 'function') {
          config.callback();
        }
        return { render: jest.fn() };
      })
    }
  })
}));


