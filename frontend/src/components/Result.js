// displays a single result formatted depending on the type of result

// import React
import React from "react";

// import mui components
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";

// import thumbsUp and thumbsUp off icon from mui-icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function Result({ result, favourites, setFavourites }) {
  // isFavourite checks if the result is in the favourites array depending on wrapperType
  const isFavourite = favourites.some(
    // if wrapperType is track, use trackId, if collection use collectionId, if artist use artistId
    (favourite) => {
      if (
        result.wrapperType === "track" ||
        result.wrapperType === "software" ||
        result.kind === "ebook"
      )
        return favourite.trackId === result.trackId;
      if (result.wrapperType === "collection") {
        // don't match collection with individual tracks
        if (
          favourite.collectionId === result.collectionId &&
          favourite.wrapperType === result.wrapperType
        )
          return true;
        return false;
      }
      if (result.wrapperType === "artist") {
        // Don't match artist with tracks by artist
        if (
          favourite.artistId === result.artistId &&
          favourite.wrapperType === result.wrapperType
        )
          return true;
        return false;
      }

      return false;
    }
  );

  const handleFavourite = (result) => {
    console.log("result", result);

    // check if result is already in favourites
    if (isFavourite) {
      // remove from favourites
      const newFavourites = favourites.filter((favourite) => {
        if (
          result.wrapperType === "track" ||
          result.wrapperType === "software" ||
          result.kind === "ebook"
        )
          return favourite.trackId !== result.trackId;
        if (result.wrapperType === "collection") {
          // to avoid removing all songs from a collection, check if collectionId is the same
          if (
            favourite.collectionId === result.collectionId &&
            favourite.wrapperType === "collection"
          )
            return false;
          return true;
        }
        if (result.wrapperType === "artist") {
          // to avoid removing all songs from an artist we match wrapperType artist
          if (
            favourite.artistId === result.artistId &&
            favourite.wrapperType === "artist"
          )
            return false;
          return true;
        }
        return false;
      });
      setFavourites(newFavourites); // update favourites state

      sessionStorage.setItem("favourites", JSON.stringify(newFavourites)); // update favourites in session storage
    } else {
      // add to favourites
      setFavourites([...favourites, result]); // update favourites state
      sessionStorage.setItem(
        "favourites",
        JSON.stringify([...favourites, result])
      ); // update favourites in session storage
    }
  };

  return (
    <Card sx={{ m: 1 }}>
      <CardHeader
        sx={{
          height: 150,
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
      {result.artworkUrl100 &&
      (result.kind === "song" ||
        result.collectionType === "Album" ||
        result.kind === "ebook" ||
        result.wrapperType === "software") ? (
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
        {/* if trackViewUrl */}
        {result.trackViewUrl && (
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
        )}
        {/* if collectionViewUrl and no trackViewUrl */}
        {result.collectionViewUrl && !result.trackViewUrl && (
          <Button
            size="small"
            sx={{ mx: "auto", my: 1 }}
            variant="contained"
            color="primary"
            href={result.collectionViewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on iTunes
          </Button>
        )}
        {/* add to favourites */}
        <Button
          size="small"
          sx={{ mx: "auto", my: 1 }}
          variant="contained"
          color="secondary"
          onClick={() => handleFavourite(result)}
          startIcon={isFavourite ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        >
          {/* if not in favourites text shows add to favourites else remove from favourites */}
          {isFavourite ? "Remove " : "Add "}
        </Button>
      </CardActions>
    </Card>
  );
}
