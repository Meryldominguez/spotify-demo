import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import './App.css';
import UserCard from './Components/UserCard';
import LoginButton from './Components/LoginButton';

const SPOTIFY_API_BASE = "https://api.spotify.com/v1"
const ENDPOINTS = [
  '/me/',
  '/me/top/artists',
  '/me/top/tracks',
  '/me/following?type=artist',
  '/me/player/currently-playing'
]

function App() {
  let [currentUser, setCurrentUser] = useState()

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
  const handleSpotifyAPIError = useCallback((err) => {
    console.log(err)
    switch (err.status) {
      case 401:
        openSSOLogin()
        break;
      default:
        localStorage.removeItem("access_token")
        window.location.href = process.env.REACT_APP_REDIRECT_URI
        break;
    }
  },[])

  const fetchSpotifyData = useCallback(({token})=> {
    Promise.all(ENDPOINTS.map(
      (endpoint) => axios.get(SPOTIFY_API_BASE+endpoint,{
        headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ token
        }}
      )))
        .then(([
          {data: user}, 
          {data: topArtists}, 
          {data: topTracks}, 
          {data: following},
          {data: currentTrack}]
          ) => {
            setCurrentUser({user, topArtists, topTracks, following, currentTrack})
          
          })
      .catch((err) => handleSpotifyAPIError(err.response.data.error))
  },[handleSpotifyAPIError])
 

  useEffect(()=>{
    const redirectedToken = getAccessTokenFromURI()

    if (redirectedToken) {
      window.localStorage.setItem("access_token", redirectedToken)
      window.location.href = process.env.REACT_APP_REDIRECT_URI
      return
    }

    let storedToken = localStorage.getItem("access_token")
    
    // if theres a token in LS, try to fetch, if fetch fails, run openSSOLogin
    if (storedToken) {
      fetchSpotifyData({token:storedToken})
    }
  },[fetchSpotifyData])

  return (
    <div className="app">
      <header className="app-header">
        Login to your Spotify account below to see information about your account!
      </header>
      <div className="body">
        {currentUser? 
        <UserCard userData={currentUser}/> : <LoginButton callback={openSSOLogin}/> }
      </div>
      <div className="footer">
        
      </ div>
    </div>
  );
}

export default App;
