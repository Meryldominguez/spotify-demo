import { useCallback, useEffect, useRef, useState } from "react"
import qs from 'qs'
import axios from "axios";
import {ENDPOINTS, SPOTIFY_API_BASE, SPOTIFY_AUTH_BASE } from "../constants";

const useGetSpotifyData = () =>{

    let [currentUser, setCurrentUser] = useState({})
    let [loaded, setLoaded] = useState(false)
    let [trySpotifyAPI, setTrySpotifyAPI] = useState(false)
    const fetchToken = useRef(true)

    const getOAuthCodeFromURI = () => {
        let {"?code":redirectedCode} = qs.parse(window.location.search)
        return redirectedCode
    }

    const refreshAccessToken = async() => {
      let refresh_token = localStorage.getItem("refresh_token")
      try {
        const result = await axios.post( SPOTIFY_AUTH_BASE + "api/token",
          {
            grant_type:"refresh_token",
            refresh_token:refresh_token,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET
          }, 
          {
            headers:{
              "content-type":"application/x-www-form-urlencoded"
            }
          }
        )
        refresh_token = result.data["refresh_token"]

        if (refresh_token){
          localStorage.setItem("refresh_token", refresh_token)
        }
        localStorage.setItem("access_token", result.data["access_token"])
        setTrySpotifyAPI(true)
      } catch (err) {
        console.log(err)
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
      }
    }

    const handleSpotifyAPIError = useCallback((err) => {
      switch (err.status) {
          case 401:
            refreshAccessToken()
          break;
          default:
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          window.location.href = process.env.REACT_APP_REDIRECT_URI
          break;
      }
    },[])

    const fetchSpotifyData = useCallback(async ()=> {
      const accessToken = localStorage.getItem("access_token")
      for (const key in ENDPOINTS) {
        try {
          let result = await axios.get(SPOTIFY_API_BASE+ENDPOINTS[key],
          {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ accessToken
            }
          })
          setCurrentUser((currentUser)=>({...currentUser, [key]:result.data}))
        } catch (err) {
          handleSpotifyAPIError(err.response.data.error)
          break
        }
      }
      setLoaded(true) 
    },[handleSpotifyAPIError])
       
    const getAccessToken = async({code}) => {
      try {
        let results = await axios.post( SPOTIFY_AUTH_BASE+"api/token",
          {
            grant_type:"authorization_code",
            code:code,
            redirect_uri:encodeURI(process.env.REACT_APP_REDIRECT_URI),
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET
          }, 
          {
            headers:{
              "content-type":"application/x-www-form-urlencoded"
            }
          }
        )
        
        localStorage.setItem("refresh_token", results.data["refresh_token"])
        localStorage.setItem("access_token", results.data["access_token"])
      } catch (err) {
        console.log(err)
      }
    }  

    useEffect(()=>{
      let code = getOAuthCodeFromURI()
      if (code) {
        if (fetchToken.current) {
          const getToken = async ()=>{ await getAccessToken({code})}
          getToken()
          console.log(code);
          fetchToken.current = false
        }
        window.location.href = process.env.REACT_APP_REDIRECT_URI
      } 
      if (trySpotifyAPI){
        fetchSpotifyData()
        localStorage.removeItem("access_token")
      } else if (localStorage.getItem("refresh_token") ) {
        if (fetchToken.current) {
          refreshAccessToken()
          fetchToken.current = false
        }
      }
        
    },[fetchSpotifyData, trySpotifyAPI])

    return [currentUser, loaded, trySpotifyAPI]
}

export default useGetSpotifyData