import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  FormGroup,
  Input,
  Select,
  TextField,
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

  const searchTypes = [
    { movie: [{ movieArtist: "Artist" }, { movie: "Movie" }] },
    { podcast: [{ podcastAuthor: "Author" }, { podcast: "Podcast" }] },
    {
      music: [
        { musicArtist: "Artist" },
        { musicTrack: "Music Track" },
        { album: "Album" },
        { musicVideo: "Music Video" },
        { mix: "Mix" },
        { song: "Song" },
      ],
    },
    { musicVideo: [{ musicArtist: "Artist" }, { musicVideo: "Music Video" }] },
    { audiobook: [{ audiobookAuthor: "Author" }, { audiobook: "Audiobook" }] },
    { shortFilm: [{ shortFilmArtist: "Artist" }, { shortFilm: "Short Film" }] },
    { tvShow: [{ tvEpisode: "Episode" }, { tvSeason: "Season" }] },
    {
      software: [
        { software: "Software" },
        { iPadSoftware: "Ipad Software" },
        { macSoftware: "Mac Software" },
      ],
    },
    { ebook: [{ ebook: "Ebook" }] },
    {
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
    },
  ];
}

export default Main;
