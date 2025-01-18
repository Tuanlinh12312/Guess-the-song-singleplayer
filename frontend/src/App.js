import React from "react";
import SongSubmissionForm from "./components/SongSubmissionForm";
import YouTubePlayer from "./components/YoutubePlayer";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Guess the song</h1>
      <SongSubmissionForm />
    </div>
  );
  // return <YouTubePlayer videoUrl={"https://www.youtube.com/watch?v=r6zIGXun57U&ab_channel=LeagueofLegends"}/>;
}

export default App;