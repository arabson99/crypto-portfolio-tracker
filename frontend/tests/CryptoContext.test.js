import { render, screen, fireEvent } from '@testing-library/react';
import { CryptoContext, CryptoState } from '../CryptoContext';

const TestComponent = () => {
  const { currency, setCurrency } = CryptoState();
  
  return (
    <div>
      <p>{currency}</p>
      <button onClick={() => setCurrency('USD')}>Set Currency to USD</button>
    </div>
  );
};

test('changes the currency when setCurrency is called', () => {
  render(
    <CryptoContext>
      <TestComponent />
    </CryptoContext>
  );

  // Check if initial currency is INR
  expect(screen.getByText('INR')).toBeInTheDocument();

  // Click button to change currency
  fireEvent.click(screen.getByText('Set Currency to USD'));

  // Check if the currency has been updated
  expect(screen.getByText('USD')).toBeInTheDocument();
});
