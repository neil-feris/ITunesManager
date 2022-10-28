// Header.js renders the header bar of the App
import React from "react";

import { AppBar, Toolbar, Typography, Link } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Montserrat Alternates" }}
        >
          <Link href="/" color="inherit" underline="none">
            iTunes Manager
          </Link>
        </Typography>
        <Link
          sx={{ fontFamily: "Montserrat Alternates" }}
          href="/favourites"
          color="inherit"
          underline="none"
        >
          Favourites
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
