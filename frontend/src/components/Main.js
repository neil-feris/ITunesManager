// import React and useState and useEffect hooks from react
import React, { useState, useEffect } from "react";

// import mui components
import {
  Box,
  Container,
  Grid,
  Typography,
  Input,
  Select,
  Button,
} from "@mui/material";

// import Result component
import Result from "./Result";

// Main renders the select elements, search input, search button and results
export default function Main({ favourites, setFavourites }) {
  // Declare state variables
  // mediaTypes stores the media type options with the display value and the value to be passed to the API
  const mediaTypes = [
    { movie: "Movie" },
    { podcast: "Podcast" },
    { music: "Music" },
    { musicVideo: "Music Video" },
    { audiobook: "Audiobook" },
    { shortFilm: "Short Film" },
    { tvShow: "TV Show" },
    { software: "Software" },
    { ebook: "Ebook" },
    { all: "All" },
  ];

  // searchTypes stores the search type options with the display value and the value to be passed to the API
  const searchTypes = {
    movie: [{ movieArtist: "Artist" }, { movie: "Movie" }],

    podcast: [{ podcastAuthor: "Author" }, { podcast: "Podcast" }],

    music: [
      { musicArtist: "Artist" },
      { musicTrack: "Music Track" },
      { album: "Album" },
      { musicVideo: "Music Video" },
      { mix: "Mix" },
      { song: "Song" },
    ],

    musicVideo: [{ musicArtist: "Artist" }, { musicVideo: "Music Video" }],

    audiobook: [{ audiobookAuthor: "Author" }, { audiobook: "Audiobook" }],

    shortFilm: [{ shortFilmArtist: "Artist" }, { shortFilm: "Short Film" }],

    tvShow: [{ tvEpisode: "Episode" }, { tvSeason: "Season" }],

    software: [
      { software: "Software" },
      { iPadSoftware: "Ipad Software" },
      { macSoftware: "Mac Software" },
    ],

    ebook: [{ ebook: "Ebook" }],

    all: [
      { movie: "Movie" },
      { album: "Album" },
      { allArtist: "Artist" },
      { podcast: "Podcast" },
      { musicVideo: "Music Video" },
      { mix: "Mix" },
      { audiobook: "Audiobook" },
      { tvSeason: "TV Season" },
      { allTrack: "Track" },
    ],
  };

  const [currentSearchType, setCurrentSearchType] = useState("musicArtist"); // default search type
  const [currentMediaType, setCurrentMediaType] = useState("music"); // default media type
  const [currentSearchTerm, setCurrentSearchTerm] = useState(""); // default search term
  const [currentSearchTypes, setCurrentSearchTypes] = useState(
    searchTypes[currentMediaType]
  ); // default search types

  // searchResults stores the results from the API
  const [searchResults, setSearchResults] = useState([]);

  // handleSearch runs when search button is clicked or Enter key is pressed.
  const handleSearch = () => {
    // fetch data from the API
    fetch(
      `/api?term=${currentSearchTerm}&media=${currentMediaType}&entity=${currentSearchType}`
    )
      .then((response) => response.json()) // convert response to json
      .then((data) => {
        setSearchResults(data.results); // set searchResults to the results from the API
        if (data.resultCount === 0) {
          // if there are no results display a message
          alert("No results found");
        }
      })
      .catch((error) => {
        // if there is an error display a message
        alert("Error: " + error);
      });
  };

  // handleSearchTypeChange runs when the search type select element is changed
  const handleSearchTypeChange = (event) => {
    // set currentSearchType to the value of the selected option
    setCurrentSearchType(event.target.value);
    // clear results
    setSearchResults([]);
  };

  // handleMediaTypeChange runs when the media type select element is changed
  const handleMediaTypeChange = (event) => {
    // set currentMediaType to the value of the selected option
    setCurrentMediaType(event.target.value);
    // update search type options
    setCurrentSearchTypes(searchTypes[event.target.value]);

    // clear results
    setSearchResults([]);
  };

  // handleSearchTermChange runs when the search term input element is changed
  const handleSearchTermChange = (event) => {
    // set currentSearchTerm to the value of the input
    setCurrentSearchTerm(event.target.value);
  };

  // set currentSearchType to first option in currentSearchTypes whenever currentSearchTypes changes
  useEffect(() => {
    // Object.keys returns an array of keys which is the search type as required by API. Object.values returns the formatted string for display
    setCurrentSearchType(Object.keys(currentSearchTypes[0])[0]);
  }, [currentSearchTypes]);

  return (
    <Container>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{ mt: 2 }}
              variant="h4"
              component="div"
              gutterBottom
            >
              Search iTunes
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Select
              sx={{ m: 2 }}
              native
              onChange={handleMediaTypeChange}
              defaultValue="music"
              inputProps={{
                name: "mediaType",
                id: "mediaType",
              }}
            >
              {
                // map media types
                mediaTypes.map((mediaType) => {
                  return (
                    // Object.keys returns an array of keys which is the media type as required by API. Object.values returns the formatted string for display
                    <option
                      key={Object.keys(mediaType)}
                      value={Object.keys(mediaType)}
                    >
                      {Object.values(mediaType)}
                    </option>
                  );
                })
              }
            </Select>
            <Select
              sx={{ m: 2 }}
              native
              onChange={handleSearchTypeChange}
              inputProps={{
                name: "searchType",
                id: "searchType",
              }}
            >
              {
                // map search types
                currentSearchTypes.map((searchType) => {
                  return (
                    <option
                      key={Object.keys(searchType)}
                      value={Object.keys(searchType)}
                    >
                      {Object.values(searchType)}
                    </option>
                  );
                })
              }
            </Select>
            <Input
              id="searchTerm"
              sx={{ m: 2 }}
              placeholder="Search"
              onChange={handleSearchTermChange}
              // pressing enter will trigger search
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              id="searchButton"
              sx={{ m: 2 }}
              variant="contained"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
          {/* if results exist  */}
          {searchResults.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h4" component="div" gutterBottom>
                  Results
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {
                    // map search results
                    searchResults.map((result, idx) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                          <Result
                            result={result}
                            favourites={favourites}
                            setFavourites={setFavourites}
                          />
                        </Grid>
                      );
                    })
                  }
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
