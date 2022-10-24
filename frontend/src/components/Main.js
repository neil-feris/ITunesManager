import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  Input,
  Select,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  CardActionArea,
  Button,
} from "@mui/material";

import Result from "./Result";

function Main() {
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

  const [loading, setLoading] = useState(false);

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

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    console.log(
      `Search URL: /api?term=${currentSearchTerm}&media=${currentMediaType}&entity=${currentSearchType} `
    );
    setLoading(true);
    fetch(
      `/api?term=${currentSearchTerm}&media=${currentMediaType}&entity=${currentSearchType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        if (data.resultCount === 0) {
          alert("No results found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const handleSearchTypeChange = (event) => {
    setCurrentSearchType(event.target.value);
  };

  const handleMediaTypeChange = (event) => {
    setCurrentMediaType(event.target.value);
    // update search type options
    setCurrentSearchTypes(searchTypes[event.target.value]);
  };

  const handleSearchTermChange = (event) => {
    setCurrentSearchTerm(event.target.value);
  };

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // if there are no favourites, return
    if (!sessionStorage.getItem("favourites")) return;
    const favourites = JSON.parse(sessionStorage.getItem("favourites"));
    setFavourites(favourites);
  }, []);

  // set currentSearchType to first option in currentSearchTypes
  useEffect(() => {
    // Object.keys returns an array of keys which is the search type as required by API. Object.values returns the formatted string for display
    setCurrentSearchType(Object.keys(currentSearchTypes[0])[0]);
  }, [currentSearchTypes]);

  const handleFavourite = (result) => {
    // check if result is already in favourites by checking the trackId
    const isFavourite = favourites.some(
      (favourite) => favourite.trackId === result.trackId
    );
    if (isFavourite) {
      // remove from favourites
      const newFavourites = favourites.filter(
        (favourite) => favourite.trackId !== result.trackId
      );
      setFavourites(newFavourites);
      sessionStorage.setItem("favourites", JSON.stringify(newFavourites));
      alert("Removed from favourites");
    } else {
      // add to favourites
      setFavourites([...favourites, result]);
      sessionStorage.setItem(
        "favourites",
        JSON.stringify([...favourites, result])
      );
      alert("Added to favourites");
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
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
            <Button sx={{ m: 2 }} variant="contained" onClick={handleSearch}>
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
                    searchResults.map((result) => {
                      // console.log(result);
                      return (
                        <Grid item xs={12} sm={6} md={4} key={result.trackId}>
                          <Result
                            result={result}
                            handleFavourite={handleFavourite}
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

export default Main;
