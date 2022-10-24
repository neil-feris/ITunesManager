// render the favourites from sessionStorage

import React from "react";

import {
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Container,
  Link,
} from "@mui/material";

function Favourites() {
  const favourites = JSON.parse(sessionStorage.getItem("favourites")) || [];

  const handleRemove = (id) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.trackId !== id
    );
    sessionStorage.setItem("favourites", JSON.stringify(newFavourites));
    window.location.reload();
  };

  // if there are no favourites, display a message
  // otherwise, display the favourites
  return (
    // if there are no favourites, display a message
    // otherwise, display the favourites
    <Container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {favourites.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="h1">
                  No favourites yet
                </Typography>
              </Box>
            </Grid>
          ) : (
            // display the favourites
            favourites.map((favourite, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card sx={{ m: 1 }}>
                  {/* console log favourite */ console.log(favourite)}
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
                        {favourite.trackName}
                      </Typography>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="270"
                    image={favourite.artworkUrl100}
                    alt={favourite.trackName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      <Link
                        underline="none"
                        href={favourite.artistViewUrl}
                        target="_blank"
                      >
                        {favourite.artistName}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {favourite.collectionName}
                    </Typography>
                    <Link href={favourite.collectionViewUrl} target="_blank">
                      <Button variant="contained" sx={{ mt: 2 }}>
                        View on iTunes
                      </Button>
                    </Link>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleRemove(favourite.trackId)}
                      size="small"
                    >
                      Remove from favourites
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Favourites;
