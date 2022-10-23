// render the favourites from localStorage

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
} from "@mui/material";

function Favourites() {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

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
                    height="140"
                    image={favourite.artworkUrl100}
                    alt={favourite.trackName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {favourite.artistName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {favourite.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
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
