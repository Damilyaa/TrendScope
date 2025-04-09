import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Box,
    CircularProgress,
    Alert,
    Button,
  } from "@mui/material";import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Favorites.css";
import { IconButton } from '@mui/material';

const FavoriteCard = ({ trend, onFavoriteToggle, isFavorited }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trend/${encodeURIComponent(trend.name)}`);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Card
    className="trend-card"
    onClick={handleClick}
    sx={{
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        height: "350px",  // You can change this to any height you prefer
        "&:hover": {
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        transform: "translateY(-4px)",
        },
    }}
    >
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box display="flex" alignItems="center" mb={2}>
        <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: "rgb(26, 77, 128)" }}>
            {trend.name}
        </Typography>
        <IconButton
            onClick={(e) => {
            e.stopPropagation();  
            onFavoriteToggle(trend);
            }}
            color={isFavorited ? "error" : "default"}
            sx={{
            position: "relative",
            top: "-15px",
            }}
        >
            <FavoriteIcon />
        </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ color: "rgba(26, 77, 128, 0.78)" }}>
        {trend.description}
        </Typography>
        <Box mt={2}>
        <Chip
            label={`#${trend.tag[0]}`}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ color: "rgba(26, 77, 128, 0.78)" }}
        />
        </Box>
    </CardContent>
    <CardActions sx={{ marginTop: 'auto' }}>
    <Button size="small" color="primary">Learn More</Button>
    </CardActions>
    </Card>

    </motion.div>
  );
};

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Handle removing a favorite trend
  const handleFavoriteToggle = (trend) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== trend.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

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
          {favorites.length > 0 ? (
            favorites.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend.id}>
                <FavoriteCard
                  trend={trend}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorited={true} 
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: "100%" }}>
              You haven't added any trends to your favorites yet.
            </Typography>
          )}
        </Grid>

        {favorites.length > 0 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/trends")} 
            >
              View All Trends
            </Button>
          </Box>
        )}
      </motion.div>
    </Container>
  );
}
