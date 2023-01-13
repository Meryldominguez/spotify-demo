import './LoginButton.css'

function LoginButton({callback}) {
  return (
    <div className="login-button" onClick={()=>callback()}> 
      <div className="button-text">Login Here :</div>
      <img
        alt="Spotify logo"
        src={process.env.PUBLIC_URL + '/Color-Spotify-Logo.png'} 
        className="logo"
        />
    </div>
  )
  
}

export default LoginButton;
