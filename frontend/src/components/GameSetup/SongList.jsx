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
      className="flex justify-start items-start mt-10 rounded-3xl overflow-y-auto overflow-x-hidden bg-amber-900/10 pt-10 ml-10 mr-auto w-[calc(50%-60px)] h-[calc(100%-35px)] scrollbar-hide">
      <ul className="w-full px-10">
        {songs.map((song, index) => (
          <li
            key={index}
            className="relative w-full flex items-center p-4 rounded-3xl mb-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-50 rounded-3xl"></div>
            <div className="relative flex items-center gap-4 w-full justify-between">
              <DisplaySong
                title={song.title}
                artists={song.artists}
                thumbnail={song.thumbnail}
              />
              <div className="h-16">
                <div className=" w-full h-full flex items-start justify-start">
                  <button
                    onClick={() => onDeleteSong(index)}
                    className="p-0 -mt-1">
                    <span className="font-coiny text-3xl leading-none">
                      x
                    </span>
                  </button>
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
