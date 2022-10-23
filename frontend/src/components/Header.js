// Header.js renders the header bar of the App
import React from "react";

import { AppBar, Toolbar, Typography, Link } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit" underline="none">
            React App
          </Link>
        </Typography>
        <Link href="/favourites" color="inherit" underline="none">
          Favourites
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
