// import express
const express = require("express");
const app = express();

// import helmet
const helmet = require("helmet");
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://fonts.googleapis.com",
          "'unsafe-inline'",
        ],
        imgSrc: ["'self'", "https://*.mzstatic.com"],
        mdeiaSrc: ["'self'", "https://*.itunes.apple.com"],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://fonts.googleapis.com",
        ],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// import path
const path = require("path");

// import api router
const api = require("./api");

// Set up api route
app.use("/api", api);

// read port from environment variable or use 3001
const PORT = process.env.PORT || 3001;

// serve the frontend static files if running in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// start the express web server listening on 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
