import DisplaySong from "./DisplaySong"

const SongList = ({ songs, onDeleteSong }) => {
    return (
      <div class="flex justify-start mt-10 items-center rounded-3xl overflow-auto bg-amber-900/10 mr-auto ml-10 pt-10 w-[calc(50%-60px)] h-[calc(100%-35px)]">
      <ul class="w-full">
        {songs.map((song, index) => (
          <li key={index}
          class="bg-song bg-contain bg-no-repeat w-full min-h-[120px] overflow-hidden flex flex-col justify-center items-center p-4 text-white">
            <DisplaySong title={song.title} artists={song.artists} thumbnail={song.thumbnail}></DisplaySong>
            <button onClick={() => onDeleteSong(index)}>❌</button>
          </li>
        ))}
      </ul>
      </div>
    );
  };
  
  export default SongList;