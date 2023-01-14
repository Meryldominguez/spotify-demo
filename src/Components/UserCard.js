import './UserCard.css';

function UserCard({userData}) {
  const {
    user, 
    topArtists,
    topTracks,
    following,
    currentTrack
    } = userData
console.log(userData)
  return (
    <div className="user-card">
      <div className="user-card-header">
      <div className='avatar'>
        <img src={user.images[0].url} alt={"Profile picture for "+user.display_name} />
      </div>
      <div className='header-info'>
        <h1>{user.display_name}</h1>
        <h3>{user.email}</h3>
        <span>{user.followers.total} Total Followers</span>
        <span>Following {following.artists.total} Artists</span>
      </div>
      </div>
      <div className="user-card-body">
        {currentTrack &&
          <div className='current-track'>
            CURRENT TRACK
          </div>
        }
        <div className='top-artists'>
          <h3>Top Artists</h3>

          {topArtists.items.map((artist, i)=>{
            return <span>{artist.name}</span>
          })}
        </div>
        <div className='top-tracks'>
        <h3>Top Tracks</h3>
        {topTracks.items.map((track, i)=>{
            return <span>*{track.name}</span>
          })}
        </div>
      </div>
      <div className='user-card-footer'>
        <a href={user.external_urls.spotify}>
            <img 
              className="spotify-profile-link" 
              src={process.env.PUBLIC_URL + '/spotify-logo-button.png'}
              alt="Click here to go to this user's Spotify profile"
            />
          </a>
      </ div>
    </div>
  );
}

export default UserCard;
