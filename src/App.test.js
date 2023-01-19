import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => jest.fn());

test('renders Spotify header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Spotify/i);
  expect(linkElement).toBeInTheDocument();
});

test('with no user, it displays the login link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
