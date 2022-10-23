// api.js contains the api route logic
const express = require("express");
const router = express.Router();

// import baseURL from config
const { baseURL } = require("./config/config.json");

let query = "";

// a blank GET request to the api route returns a message
router.get("/", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    // if no query parameters are passed, return a status 400 (Bad Request) and a message
    res.status(400).send("No query parameters passed");
  } else {
    // if the request contains a query, it is stored in the query variable
    query = req.query;

    // build the query string by looping through the query object
    let queryString = "";
    for (let key in query) {
      queryString += `${key}=${query[key]}&`;
    }
    // strip the trailing ampersand
    queryString = queryString.slice(0, -1);

    // Make a fetch request to the baseURL with the query and store the result in the result variable if there is an error, return a status 500 (Internal Server Error) and the error message
    fetch(`${baseURL}&${queryString}`)
      .then((res) => res.json())
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

// export API router
module.exports = router;
