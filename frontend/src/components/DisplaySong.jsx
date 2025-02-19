const DisplaySong = ({ title, artists }) => {
    return (
      <div>
        <h3>{title}</h3>
        <p>{artists.join(", ")}</p>
      </div>
    );
  };
  
export default DisplaySong