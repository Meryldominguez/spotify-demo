import './App.css';
import UserCard from './Components/UserCard';
import LoginButton from './Components/LoginButton';

function App() {
  let currentUser

  const login = ()=>{
    console.log("LOGGED IN")
  }

  return (
    <div className="app">
      <header className="app-header">
        Login to your Spotify account below to see information about your account!
      </header>
      <div className="body">
      {currentUser? 
      <UserCard user={currentUser}/> : <LoginButton callback={login}/> }
    </div>
      
    </div>
  );
}

export default App;
