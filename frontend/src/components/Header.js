// Header.js renders the header bar of the App
import React from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      {/* position="static" means the AppBar will be fixed to the top of the page */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ITunes Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
