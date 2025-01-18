import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/components/Header';
import { BrowserRouter } from 'react-router-dom';

test('renders Header and checks for dropdown menu and title', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Check if the title exists
  const title = screen.getByText(/cryptocurrency portfolio tracker/i);
  expect(title).toBeInTheDocument();

  // Check if currency dropdown is present
  const currencyDropdown = screen.getByRole('button');
  expect(currencyDropdown).toBeInTheDocument();
});
