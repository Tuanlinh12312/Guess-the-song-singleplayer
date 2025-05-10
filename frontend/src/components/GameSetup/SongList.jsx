import { useEffect, useRef } from "react";
import DisplaySong from "./DisplaySong";

const SongList = ({ songs, onDeleteSong }) => {
  const scrollRef = useRef(null);
  const prevLengthRef = useRef(songs.length);

  useEffect(() => {
    if (songs.length > prevLengthRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    prevLengthRef.current = songs.length;
  }, [songs]);

  return (
    <div
      ref={scrollRef}
      className="flex justify-start mt-10 items-start rounded-3xl overflow-y-auto overflow-x-hidden bg-amber-900/10 mr-auto ml-10 pt-10 w-[calc(50%-60px)] h-[calc(100%-35px)] scrollbar-hide"
    >
      <ul className="w-full">
        {songs.map((song, index) => (
          <li
            key={index}
            className="relative w-[calc(100%-80px)] mr-10 ml-10 overflow-hidden flex items-center p-4 rounded-3xl mb-3"
          >
            <div className="absolute inset-0 bg-white opacity-50 rounded-3xl"></div>
            <div className="relative flex items-center gap-4 w-full justify-between">
              <DisplaySong
                title={song.title}
                artists={song.artists}
                thumbnail={song.thumbnail}
              />
              <div className="flex flex-col h-16 items-center">
                <div className="flex flex-col items-start justify-center h-16">
                  <button onClick={() => onDeleteSong(index)}>
                    <img src="/images/xicon.png" alt="delete" className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-end justify-center mt-5">
                  <img
                    src="/images/listsongplay.png"
                    alt="play"
                    className="h-7 w-7"
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
