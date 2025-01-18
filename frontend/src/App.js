import React from "react";
import SongSubmissionForm from "./components/SongSubmissionForm";
import YouTubePlayer from "./components/YoutubePlayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainGame from "./components/MainGame";

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