import { render, screen } from '@testing-library/react';
import UserCard from './UserCard'

test('renders hello text', () => {
  render(<UserCard />);
  const textElement = screen.getByText(/Hello/i);
  expect(textElement).toBeInTheDocument();
});
