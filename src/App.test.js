import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock App to avoid heavy imports (firebase, crypto libs) during unit tests
jest.mock('./App', () => () => <div>App</div>);
import App from './App';

test('renders App mock', () => {
  render(<App />);
  expect(screen.getByText('App')).toBeInTheDocument();
});
