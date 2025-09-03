import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqList from '../FaqList';

// Mock i18n hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k) => k })
}));

// Mock request util
jest.mock('../../../utils/request', () => ({
  getPublicFaqs: jest.fn()
}));

describe('FaqList', () => {
  const { getPublicFaqs } = require('../../../utils/request');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading then empty state', async () => {
    getPublicFaqs.mockResolvedValue({ data: { faqs: [] } });

    render(<FaqList />);

    expect(screen.getByText('admin.faqs.loading')).toBeInTheDocument();

    expect(await screen.findByText('There are no questions.')).toBeInTheDocument();
  });

  test('renders list and allows toggling an item (via height)', async () => {
    getPublicFaqs.mockResolvedValue({ data: { faqs: [
      { title: 'Question A', description: '<p>Answer A</p>' },
      { title: 'Question B', description: '<p>Answer B</p>' }
    ] } });

    const { container } = render(<FaqList />);

    // Wait for one of the items
    await screen.findByText('Question A');

    // Initially collapsed (height 0)
    const collapse = container.querySelector('.ReactCollapse--collapse');
    expect(collapse.style.height).toBe('0px');

    // Toggle via clicking the title
    userEvent.click(screen.getByText('Question A'));
    expect(collapse.style.height).not.toBe('0px');
  });

  test('renders error state on request failure', async () => {
    getPublicFaqs.mockRejectedValue(new Error('network'));

    render(<FaqList />);

    expect(await screen.findByText("The data couldn't be fetched.")).toBeInTheDocument();
  });
});


