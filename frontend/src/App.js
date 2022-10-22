import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Main />
    </>
  );
}

export default App;
