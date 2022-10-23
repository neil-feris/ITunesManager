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
  Button,
} from "@mui/material";

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

  const [currentSearchType, setCurrentSearchType] = useState(""); // default search type
  const [currentMediaType, setCurrentMediaType] = useState("all"); // default media type
  const [currentSearchTerm, setCurrentSearchTerm] = useState(""); // default search term
  const [currentSearchTypes, setCurrentSearchTypes] = useState(
    searchTypes[currentMediaType]
  ); // default search types

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    console.log(
      `Search URL: /api?term=${currentSearchTerm}&media=${currentMediaType}&entity=${currentSearchType} `
    );
    fetch(
      `/api?term=${currentSearchTerm}&media=${currentMediaType}&entity=${currentSearchType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        console.log(data.results);
      });
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
    if (!localStorage.getItem("favourites")) return;
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    setFavourites(favourites);
  }, []);

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
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
      alert("Removed from favourites");
    } else {
      // add to favourites
      setFavourites([...favourites, result]);
      localStorage.setItem(
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
              defaultValue="all"
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
          <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom>
              Results
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {searchResults.map((result, idx) => {
                return (
                  <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ m: 1 }}>
                      <CardHeader
                        sx={{
                          height: 100,
                        }}
                        title={
                          <Typography
                            variant="h6"
                            component="div"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            gutterBottom
                          >
                            {result.trackName}
                          </Typography>
                        }
                      />

                      <CardContent>
                        <CardMedia
                          component="img"
                          height="100"
                          width="100"
                          image={result.artworkUrl100}
                          alt={result.trackName}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {result.artistName}
                        </Typography>
                        {/* if mediaType is movie, musicVideo, shortFilm, or tvShow or searchType is musicVideo show video element with previewurl */}
                        {(currentMediaType === "movie" ||
                          currentMediaType === "musicVideo" ||
                          currentMediaType === "shortFilm" ||
                          currentMediaType === "tvShow" ||
                          currentSearchType === "musicVideo") && (
                          <video
                            controls
                            src={result.previewUrl}
                            width="100%"
                            height="auto"
                          ></video>
                        )}
                        {/* if searchType is musicTrack or allTrack show audio element with previewurl */}
                        {(currentSearchType === "musicTrack" ||
                          currentSearchType === "allTrack") && (
                          <audio
                            controls
                            src={result.previewUrl}
                            width="100%"
                            height="auto"
                          ></audio>
                        )}
                        {/* add to favourites button */}
                        <Button
                          sx={{ m: 2 }}
                          variant="contained"
                          onClick={() => {
                            handleFavourite(result);
                          }}
                        >
                          Add to favourites
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2, flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" gutterBottom>
              Favourites
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {favourites.map((result, idx) => {
                return (
                  <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ m: 1 }}>
                      <CardHeader
                        sx={{
                          height: 100,
                        }}
                        title={
                          <Typography
                            variant="h6"
                            component="div"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            gutterBottom
                          >
                            {result.trackName}
                          </Typography>
                        }
                      />

                      <CardContent>
                        <CardMedia
                          component="img"
                          height="100"
                          width="100"
                          image={result.artworkUrl100}
                          alt={result.trackName}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {result.artistName}
                        </Typography>
                        {/* if mediaType is movie, musicVideo, shortFilm, or tvShow or searchType is musicVideo show video element with previewurl */}
                        {(currentMediaType === "movie" ||
                          currentMediaType === "musicVideo" ||
                          currentMediaType === "shortFilm" ||
                          currentMediaType === "tvShow" ||
                          currentSearchType === "musicVideo") && (
                          <video
                            controls
                            src={result.previewUrl}
                            width="100%"
                            height="auto"
                          ></video>
                        )}
                        {/* if searchType is musicTrack or allTrack show audio element with previewurl */}
                        {(currentSearchType === "musicTrack" ||
                          currentSearchType === "allTrack") && (
                          <audio
                            controls
                            src={result.previewUrl}
                            width="100%"
                            height="auto"
                          ></audio>
                        )}
                        {/* remove from favourites button */}
                        <Button
                          sx={{ m: 2 }}
                          variant="contained"
                          onClick={() => {
                            handleFavourite(result);
                          }}
                        >
                          Remove from favourites
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Main;
