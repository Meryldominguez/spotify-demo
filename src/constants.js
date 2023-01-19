export const ENDPOINTS = {
    user: '/me/',
    topArtists: '/me/top/artists',
    topTracks:'/me/top/tracks',
    following:'/me/following?type=artist',
    currentTrack:'/me/player/currently-playing'
}
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1"
export const SPOTIFY_AUTH_BASE = 'https://accounts.spotify.com/'
export const SCOPES = [
    'user-read-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-read',
    'user-read-currently-playing',
    'user-read-playback-position',
    'user-top-read',
    'user-read-email',
    'user-read-recently-played',
    'user-library-read'
  ]