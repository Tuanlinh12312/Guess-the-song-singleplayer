import DisplaySong from "./DisplaySong"

const SongList = ({ songs, onDeleteSong }) => {
    return (
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <DisplaySong title={song.title} artists={song.artists}></DisplaySong>
            <button onClick={() => onDeleteSong(index)}>❌</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default SongList;