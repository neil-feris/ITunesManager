// displays a single result formatted depending on the type of result

import React from "react";

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";

function Result({ result, favourites, setFavourites }) {
  // console.log(result);
  const isFavourite = favourites.some(
    // if wrapperType is track, use trackId, if collection use collectionId, if artist use artistId
    (favourite) => {
      if (result.wrapperType === "track")
        return favourite.trackId === result.trackId;
      if (result.wrapperType === "collection")
        return favourite.collectionId === result.collectionId;
      if (result.wrapperType === "artist")
        return favourite.artistId === result.artistId;
      return false;
    }
  );

  const handleFavourite = (result) => {
    // check if result is already in favourites by checking the trackId
    if (isFavourite) {
      // remove from favourites
      const newFavourites = favourites.filter((favourite) => {
        console.log("Fav: ", favourite);
        if (result.wrapperType === "track")
          return favourite.trackId !== result.trackId;
        if (result.wrapperType === "collection")
          return favourite.collectionId !== result.collectionId;
        if (result.wrapperType === "artist")
          return favourite.artistId !== result.artistId;
        return false;
      });
      setFavourites(newFavourites);
      sessionStorage.setItem("favourites", JSON.stringify(newFavourites));
      // alert("Removed from favourites");
    } else {
      // add to favourites
      setFavourites([...favourites, result]);
      sessionStorage.setItem(
        "favourites",
        JSON.stringify([...favourites, result])
      );
      // alert("Added to favourites");
    }
  };

  return (
    <Card sx={{ m: 1 }}>
      <CardHeader
        sx={{
          height: 100,
        }}
        title={
          <Typography variant="h6" component="div">
            {/* if wrapperType is artist or collection show artistName else trackName */}
            {result.wrapperType === "artist" ||
            result.wrapperType === "collection"
              ? result.artistName
              : result.trackName}
          </Typography>
        }
        subheader={
          <Typography variant="body2" component="div">
            {/* if wrapperType is artist or collection don't show subheader */}
            {result.wrapperType === "artist" ||
            result.wrapperType === "collection"
              ? null
              : result.artistName}
          </Typography>
        }
      />
      {/* if artworkUrl100 is there */}
      {result.artworkUrl100 ? (
        <CardMedia
          component="img"
          height="270"
          image={result.artworkUrl100}
          alt={result.trackName}
        />
      ) : null}
      {/* if result.kind = song show preview in audio component */}
      {result.kind === "song" && (
        <CardMedia component="audio" src={result.previewUrl} controls />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {result.collectionName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {result.primaryGenreName}
        </Typography>
        {/* if kind is feature-movie show long description */}
        {result.kind === "feature-movie" && (
          <Typography
            variant="body2"
            color="text.secondary"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            noWrap
          >
            {result.longDescription}
          </Typography>
        )}
        {/* if kind is music-video, short-film or feature-movie show CardMedia with video component */}
        {(result.kind === "music-video" ||
          result.kind === "short-film" ||
          result.kind === "feature-movie") && (
          <CardMedia
            component="video"
            src={result.previewUrl}
            controls
            sx={{ mt: 2 }}
          />
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ mx: "auto", my: 1 }}
          variant="contained"
          color="primary"
          href={result.trackViewUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on iTunes
        </Button>
        {/* add to favourites */}
        <Button
          size="small"
          sx={{ mx: "auto", my: 1 }}
          variant="contained"
          color="secondary"
          onClick={() => handleFavourite(result)}
        >
          {/* if not in favourites text shows add to favourites else remove from favourites */}
          {isFavourite ? "Remove from favourites" : "Add to favourites"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default Result;
