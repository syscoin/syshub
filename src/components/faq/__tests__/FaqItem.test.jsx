import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqItem from '../FaqItem';

describe('FaqItem', () => {
  const faq = {
    title: 'What is Syscoin?',
    description: '<p>Syscoin is a blockchain protocol.</p>'
  };

  test('renders title and index, content collapsed by default (height 0)', () => {
    const { container } = render(<FaqItem faq={faq} index={1} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('What is Syscoin?')).toBeInTheDocument();
    const collapse = container.querySelector('.ReactCollapse--collapse');
    expect(collapse).toBeTruthy();
    expect(collapse.style.height).toBe('0px');
  });

  test('toggles content height when clicking header', () => {
    const { container } = render(<FaqItem faq={faq} index={2} />);

    const header = screen.getByText('What is Syscoin?');
    const collapse = container.querySelector('.ReactCollapse--collapse');
    expect(collapse.style.height).toBe('0px');

    userEvent.click(header);
    // Opened: height should no longer be 0px (react-collapse sets pixel height during animation)
    expect(collapse.style.height).not.toBe('0px');

    userEvent.click(header);
    // Closed again
    expect(collapse.style.height).toBe('0px');
  });
});


