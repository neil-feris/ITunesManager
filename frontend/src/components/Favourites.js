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
import Result from "./Result";

function Favourites({ favourites, setFavourites }) {
  // const favourites = JSON.parse(sessionStorage.getItem("favourites")) || [];

  // if there are no favourites, display a message
  // otherwise, display the favourites using Result component

  return (
    <Container>
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={2}>
          {favourites.length === 0 && (
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h4"
                component="div"
                gutterBottom
              >
                No favourites yet
              </Typography>
            </Grid>
          )}
          {favourites.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="h4"
                  component="div"
                  gutterBottom
                >
                  Your Favourites
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {favourites.map((result, idx) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Result
                          result={result}
                          favourites={favourites}
                          setFavourites={setFavourites}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Favourites;
