import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Favourites from "./components/Favourites";

function App() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // if there are no favourites, return
    if (!sessionStorage.getItem("favourites")) return;
    const favourites = JSON.parse(sessionStorage.getItem("favourites"));
    setFavourites(favourites);
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main favourites={favourites} setFavourites={setFavourites} />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites favourites={favourites} setFavourites={setFavourites} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
