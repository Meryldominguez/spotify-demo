import { render, screen } from '@testing-library/react';
import UserCard from './UserCard'

const mockUser ={
  display_name: "FULL NAME",
  images:[{url:"www.google.com"}],
  followers:{total:20},
  external_urls:{spotify:"https://open.spotify.com/abcd"}
}
const mockUserData = {
  user:mockUser, 
  topArtists:{items:[{name:"favorite artist"}]},
  topTracks:{items:[{name:"favorite song"}]},
  following:{artists:{total:4}},
  currentTrack:{}
}

test('renders header text', () => {
  render(<UserCard userData={mockUserData}/>);
  const textElement = screen.getByText(/FULL NAME/i);
  expect(textElement).toBeInTheDocument();
});

