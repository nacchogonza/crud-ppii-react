import React from "react";
import { HomeView } from "./views/Home";
import { SearchView } from "./views/Search";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomeView />} />
        <Route path="/search" element={<SearchView />} />
      </Routes>
    </div>
  );
}

export default App;
