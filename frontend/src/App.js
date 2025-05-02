import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameSetup from "./pages/GameSetup";
import MainGame from "./pages/MainGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameSetup />} />
        <Route path="/game" element={<MainGame />} />
      </Routes>
    </Router>
  );
}

export default App;
