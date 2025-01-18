import { render, screen, waitFor } from '@testing-library/react';
import CoinInfo from './src/components/CoinInfo';
import { BrowserRouter } from 'react-router-dom';
import { CryptoContext } from '../CryptoContext';
import axios from 'axios';

jest.mock('axios');  // Mock axios

test('loads and displays historic data for a coin', async () => {
  const mockData = {
    data: { prices: [[1640000000000, 50000], [1640003600000, 51000]] },
  };
  axios.get.mockResolvedValue(mockData);

  render(
    <BrowserRouter>
      <CryptoContext>
        <CoinInfo coin={{ id: 'bitcoin' }} />
      </CryptoContext>
    </BrowserRouter>
  );

  // Wait for the chart to load
  await waitFor(() => screen.getByRole('img'));

  // Check if the price data is displayed
  expect(screen.getByText(/Price \( Past 1 Days \)/i)).toBeInTheDocument();
});
