import React from "react";
import { HomeView } from "./views/Home";
import { SearchView } from "./views/Search";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditView } from "./views/Edit";
import { AddView } from "./views/Add";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/all-episodes" element={<HomeView />} />
        <Route path="/edit/:id" element={<EditView />} />
        <Route path="/add" element={<AddView />} />
      </Routes>
    </div>
  );
}

export default App;
