import "./App.css";
import { React } from "react";
import Search from "./Components/Search";
import Favorites from "./Components/Favorites";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Search />} />
        <Route exact path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
