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
import { IconButton } from '@mui/material';
import "./Favorites.css";

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
    >
    <CardContent className="trend-card-content">
        <Box className="trend-header">
        <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2" className="trend-title">
            {trend.name}
        </Typography>
        <IconButton
            onClick={(e) => {
            e.stopPropagation();  
            onFavoriteToggle(trend);
            }}
            color={isFavorited ? "error" : "default"}
            className="favorite-button"
        >
            <FavoriteIcon />
        </IconButton>
        </Box>
        <Typography variant="body2" className="trend-description" paragraph>
        {trend.description}
        </Typography>
        <Box mt={2}>
        <Chip
            label={`#${trend.tag[0]}`}
            color="primary"
            variant="outlined"
            size="small"
            className="trend-tag"
        />
        </Box>
    </CardContent>
    <CardActions className="trend-actions">
    <Button size="small" color="primary">Learn More</Button>
    </CardActions>
    </Card>

    </motion.div>
  );
};

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleFavoriteToggle = (trend) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== trend.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container className="favorites-container">
      <div className="favorites-header">
        <Typography variant="h3" component="h1" className="favorites-title">
          Favorites
        </Typography>
        <Typography variant="h6" component="h2" className="favorites-subtitle">
          Your saved trends and insights
        </Typography>
      </div>
      <div className="favorites-box">
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <FavoriteIcon className="empty-favorites-icon" />
          <Typography variant="h6" className="empty-favorites-text">
            You haven't saved any favorites yet
          </Typography>
          
        </div>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((trend) => (
            <Grid item xs={12} sm={6} md={4} key={trend.id}>
              <FavoriteCard
                trend={trend}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
      </div>
      
    </Container>
  );
}
