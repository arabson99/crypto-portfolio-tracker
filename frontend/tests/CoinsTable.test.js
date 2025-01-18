import { render, screen, fireEvent } from '@testing-library/react';
import CoinsTable from '../src/components/CoinTable';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        current_price: 50000,
        price_change_percentage_24h: 2.5,
        market_cap: 900000000000,
      },
    ],
  }),
}));

test('renders the coins table with data', async () => {
  render(
    <BrowserRouter>
      <CoinsTable />
    </BrowserRouter>
  );

  // Check if the title is rendered
  const title = screen.getByText(/cryptocurrency prices by market cap/i);
  expect(title).toBeInTheDocument();

  // Check if the coin data is present in the table
  expect(await screen.findByText(/Bitcoin/i)).toBeInTheDocument();
  expect(await screen.findByText('$50,000.00')).toBeInTheDocument();
  expect(await screen.findByText(/+2.50%/i)).toBeInTheDocument();
});
