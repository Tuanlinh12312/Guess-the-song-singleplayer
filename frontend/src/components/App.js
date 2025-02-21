import React from "react";
import SongSubmissionForm from "./SongSubmissionForm";
import YouTubePlayer from "./YoutubePlayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainGame from "./MainGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SongSubmissionForm />} />
        <Route path="/ingame" element={<MainGame />} />
      </Routes>
    </Router>
  );
}

export default App;
