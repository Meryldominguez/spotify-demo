import './LoginButton.css'
import qs from 'qs';
import { SCOPES, SPOTIFY_AUTH_BASE } from '../constants';

export function LoginButton() {

  const constructOAuthUri = (scopes) =>
        SPOTIFY_AUTH_BASE+"authorize?"+
        qs.stringify({ 
            client_id: process.env.REACT_APP_CLIENT_ID,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            scope:scopes.join(' '),
            response_type: 'code',
        })
  
  return (
    <a href={constructOAuthUri(SCOPES)} rel="noopener noreferrer">
      <div className="button"> 
        <div className="button-text">Login Here :</div>
        <img
          alt="Spotify logo"
          src={process.env.PUBLIC_URL + '/Color-Spotify-Logo.png'} 
          className="logo"
          />
      </div>
    </a>
  )
}
export function LogoutButton() {

  const constructOAuthUri = () =>{}
  
  return (
      <div className="button"> 
        <div className="button-text">Logout of Spotify</div>
        <img
          alt="Spotify logo"
          src={process.env.PUBLIC_URL + '/Color-Spotify-Logo.png'} 
          className="logo"
          />
      </div>
  )
}

