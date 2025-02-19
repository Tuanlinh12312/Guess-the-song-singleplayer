const SongList = ({ songs, onDeleteSong }) => {
    return (
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song}  
            <button onClick={() => onDeleteSong(index)}>❌</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default SongList;