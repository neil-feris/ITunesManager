// render the favourites list

// import React
import React from "react";

// import mui components
import { Grid, Box, Typography, Container } from "@mui/material";

// import Result component
import Result from "./Result";

export default function Favourites({ favourites, setFavourites }) {
  return (
    <Container>
      <Box sx={{ flexGrow: 1, my: 3 }}>
        <Grid container spacing={2}>
          {/* If there are no favourites display a message */}
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
                  {/* Map through the favourites array and render a Result component for each item */}
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
