import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Favourites from "./components/Favourites";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
