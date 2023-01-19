import './App.css';
import useGetSpotifyData from './Hooks/useGetSpotifyData'
import UserCard from './Components/UserCard';
import {LoginButton, LogoutButton} from './Components/LoginButton';


function App() {
  const [currentUser, loaded, tryCalls] = useGetSpotifyData()
  return (
      <div className="app">
        <header className="app-header">
          Login to your Spotify account below to see information about your account!
        </header>
        <div className="body">
          {tryCalls
            ?
            <>
            <LogoutButton/>
            {loaded 
              ?<UserCard userData={currentUser}/>
              :<div className="lds-dual-ring"></div>
            }
            </>
            :
            <LoginButton/>
          }
          
          
        </div>
        <div className="footer">

        </ div>
      </div>
  );
}

export default App;
