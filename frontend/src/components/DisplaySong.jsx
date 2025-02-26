const DisplaySong = ({ title, artists, thumbnail }) => {
  return (
    <div>
      {thumbnail && (
        <img 
          src={thumbnail} 
          alt={`${title} thumbnail`} 
          style={{ 
            width: "100px", 
            height: "100px", 
            objectFit: "cover", 
            borderRadius: "8px" 
          }} 
        />
      )}
      <h3>{title}</h3>
      <p>{artists.join(", ")}</p>
    </div>
  );
};


export default DisplaySong;
