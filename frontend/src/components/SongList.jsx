import DisplaySong from "./DisplaySong"

const SongList = ({ songs, onDeleteSong }) => {
    return (
      <div class="flex justify-start mt-10 items-start rounded-3xl overflow-auto bg-amber-900/10 mr-auto ml-10 pt-10 w-[calc(50%-60px)] h-[calc(100%-35px)]">
      <ul class="w-full">
        {songs.map((song, index) => (
          <li key={index} class="relative w-[calc(100%-80px)] mr-10 ml-10 overflow-hidden flex items-center p-4 rounded-3xl mb-3">
          <div class="absolute inset-0 bg-white opacity-50 rounded-3xl"></div>
          <div class="relative flex items-center gap-4 w-full justify-between">
          <DisplaySong title={song.title} artists={song.artists} thumbnail={song.thumbnail}></DisplaySong>
          <div class="flex flex-col h-16 items-center">
          <div class="flex flex-col items-start justify-center h-16">
        <button
          // class="absolute "
          onClick={() => onDeleteSong(index)} >
          <img 
      src="/images/xicon.png" 
      alt="background" 
      class="h-4 w-4" 
    />
        </button>
        </div>
        <div class="flex items-end justify-center mt-5">
        <img
        src="/images/listsongplay.png"
        alt="Icon"
        class="h-7 w-7"
      />
      </div>
        </div>
        </div>
          </li>
        ))}
      </ul>
      </div>
    );
  };
  
  export default SongList;