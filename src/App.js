import { useState, useEffect } from "react";

import './App.css';
import UserCard from './Components/UserCard';
import LoginButton from './Components/LoginButton';
const SPOTIFY_API_BASE = "https://api.spotify.com/v1"

function App() {
  let [currentUser, setCurrentUser] = useState()

  useEffect(()=>{
    const redirectedToken = getAccessTokenFromURI()

    if (redirectedToken) {
      window.localStorage.setItem("access_token", redirectedToken)
      window.location.href = process.env.REACT_APP_REDIRECT_URI
    }

    let storedToken = localStorage.getItem("access_token")
    // if theres a token in LS, try to fetch, if fetch fails, run openSSOLogin
    if (storedToken) {
      let user = fetchSpotifyUser({authorizationToken: storedToken})
      setCurrentUser(user)
    }
  },[])

  const openSSOLogin = async () => {
    const uri = (scopes) =>
      'https://accounts.spotify.com/authorize?client_id=' + process.env.REACT_APP_CLIENT_ID +
      '&redirect_uri=' +  encodeURIComponent(process.env.REACT_APP_REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
    const scopes= [
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
    window.location.href = uri(scopes)
  }
  const getAccessTokenFromURI = () => {
    let {access_token:redirectedToken} = window.location.href
    .slice(process.env.REACT_APP_REDIRECT_URI.length+2)
    .split("&")
    .reduce(
      (acc,next)=>{
          let [key,value] = next.split("=")
          acc[key]=value
          return acc
      },{})
    return redirectedToken
  }
  const fetchSpotifyUser = ({authorizationToken})=> {
    let response = fetch(SPOTIFY_API_BASE+'/me/',{
      headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ authorizationToken
    },}) 
    .then((response) => response.json())
    .then((data) => console.log(data));

    console.log(response)
  }

  return (
    <div className="app">
      <header className="app-header">
        Login to your Spotify account below to see information about your account!
      </header>
      <div className="body">
      {currentUser? 
      <UserCard user={currentUser}/> : <LoginButton callback={openSSOLogin}/> }
    </div>
      
    </div>
  );
}

export default App;
