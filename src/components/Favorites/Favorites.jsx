import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Chip, Button, Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Favorites({ favorites }) {
  console.log(favorites); 

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            mb: 4,
            background: "linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Favorite Trends
        </Typography>

        <Grid container spacing={3}>
          {favorites && favorites.length > 0 ? (
            favorites.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ color: "rgb(26, 77, 128)" }}>
                      {trend.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ color: "rgba(26, 77, 128, 0.78)" }}>
                      {trend.description}
                    </Typography>
                    <Chip label={`#${trend.tag[0]}`} color="primary" variant="outlined" size="small" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h5" align="center">You have no favorites yet!</Typography>
          )}
        </Grid>

        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" component={Link} to="/trends">
            Back to Trends
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}
