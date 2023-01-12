import { render, screen } from '@testing-library/react';
import LoginButton from './LoginButton'

test('renders Login text', () => {
  render(<LoginButton />);
  const textElement = screen.getByText(/login/i);
  expect(textElement).toBeInTheDocument();
});
