import './UserCard.css';

function UserCard({userData}) {
  const {
    user, 
    topArtists,
    topTracks,
    following,
    currentTrack
    } = userData

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className='user-card-avatar'>
          <img src={user.images[0].url} alt={"Profile picture for "+user.display_name} />
        </div>
        </div>
      <div className="user-card-body">
        BODY
      </div>
      
    
    </div>
  );
}

export default UserCard;
