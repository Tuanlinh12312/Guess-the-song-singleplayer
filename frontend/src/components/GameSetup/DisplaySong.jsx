import React, { useMemo } from "react";

const SongItem = ({ title, artists, thumbnail }) => {
  const icon = useMemo(() => {
  const icons = [
    "/images/songlisticon.png",
    "/images/songlisticon1.png",
    "/images/songlisticon2.png",
    "/images/songlisticon3.png",
    "/images/songlisticon4.png"
  ];


    return icons[Math.floor(Math.random() * icons.length)];
  }, []);

  return <DisplaySong title={title} artists={artists} thumbnail={thumbnail} icon={icon} />;
};

const DisplaySong = ({ title, artists, thumbnail, icon }) => {
  return (
    <div className="relative flex items-center gap-4 w-full justify-between">
      {thumbnail && (
        <img 
          src={thumbnail} 
          alt={`${title} thumbnail`} 
          className="w-16 h-16 rounded-lg object-cover"
        />
      )}
      <div className="flex-1 flex flex-col ml-2">
        <span className="text-lg font-bold text-gray-900 uppercase -mb-1">{title}</span>
        <span className="text-sm text-gray-700">{artists?.join(", ")}</span>
        <img
          src={icon}
          alt="Icon"
          className="w-[calc(100%-20px)] mt-2 rounded-full"
        />
      </div>
    </div>
  );
};

// Only one default export (SongItem)
export default SongItem;
