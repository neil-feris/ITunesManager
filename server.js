// import express
const express = require("express");
const app = express();

// import helmet
const helmet = require("helmet");
app.use(helmet());

// import api router
const api = require("./api");

// Set up api route
app.use("/api", api);

// read port from environment variable or use 3001
const PORT = process.env.PORT || 3001;

// Set up basic response
app.get("/", (req, res) => {
  res.send("Itunes API!");
});

// start the express web server listening on 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
