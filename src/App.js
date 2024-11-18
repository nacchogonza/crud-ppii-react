import React from "react";
import { AllEpisodesView } from "./views/AllEpisodes";
import { HomeView } from "./views/Home";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditView } from "./views/Edit";
import { AddView } from "./views/Add";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/all-episodes" element={<AllEpisodesView />} />
        <Route path="/edit/:id" element={<EditView />} />
        <Route path="/add" element={<AddView />} />
      </Routes>
    </div>
  );
}

export default App;
