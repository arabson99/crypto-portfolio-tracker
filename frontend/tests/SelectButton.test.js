import { render, screen, fireEvent } from '@testing-library/react';
import SelectButton from '../src/components/SelectButton';

test('renders SelectButton and toggles its state on click', () => {
  const mockOnClick = jest.fn();
  
  render(
    <SelectButton selected={false} onClick={mockOnClick}>
      Select
    </SelectButton>
  );

  // Check if the button text is rendered
  const button = screen.getByText(/select/i);
  expect(button).toBeInTheDocument();

  // Simulate a click and check if the click handler was called
  fireEvent.click(button);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
