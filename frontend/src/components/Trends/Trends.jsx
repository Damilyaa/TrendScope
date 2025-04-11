import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "./Trends.css";
import { formatDate } from "../../utils/dateUtils";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

const TrendCard = ({ trend, onFavoriteToggle, isFavorited }) => {
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
              color={isFavorited ? "favorites" : "default"}
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
        <CardActions>
          <Button size="small" color="primary">Learn More</Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};


export default function Trends() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(9);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const currentDate = formatDate();

  const fetchTrends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://89.219.32.91:8008/api/trends");
      if (!response.ok) {
        throw new Error("Не удалось загрузить тренды");
      }
      const data = await response.json();
      const trendsArray = Array.isArray(data) ? data : data.trends || [];
  
      const uniqueTrends = trendsArray.filter((trend, index, self) =>
        index === self.findIndex((t) => t.id === trend.id)
      );
  
      setTrends(uniqueTrends);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  const handleFavoriteToggle = (trend) => {
    const isFavorited = favorites.some((fav) => fav.id === trend.id);
    
    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== trend.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, trend];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 6);
  };

  const isFavorited = (trend) => {
    return favorites.some((fav) => fav.id === trend.id);
  };

  return (
    <Container className="trends-container">
      <div className="trends-header">
        <Typography variant="h3" component="h1" className="trends-title">
          Current Trends
        </Typography>
        <Typography variant="h6" component="h2" className="trends-subtitle">
          Discover what's trending today
        </Typography>
      </div>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="error-container">
          <Typography variant="h6" className="error-message">
            {error}
          </Typography>
          <Button onClick={fetchTrends}>Try Again</Button>
        </div>
      ) : (
        <>
          <div className="trends-day">
            <Typography variant="h5" className="trends-date">
              {currentDate}
            </Typography>
            <Grid container spacing={3}>
              {trends.slice(0, limit).map((trend) => (
                <Grid item xs={12} sm={6} md={4} key={trend.id}>
                  <TrendCard
                    trend={trend}
                    onFavoriteToggle={handleFavoriteToggle}
                    isFavorited={isFavorited(trend)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          {trends.length > limit && (
            <div className="load-more-container">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLoadMore}
                className="load-more-button"
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
