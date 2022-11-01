// Header.js renders the header bar of the App
import React from "react";

// import mui components
import { AppBar, Toolbar, Typography, Link } from "@mui/material";

export default function Header() {
  // Render the header bar of the App with links to home and favourites
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Montserrat Alternates" }}
        >
          <Link href="/" color="inherit" underline="none">
            Media Favourites Manager
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
