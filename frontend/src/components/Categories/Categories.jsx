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
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "./Categories.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

const fetchTrendsData = async () => {
  try {
    const response = await fetch("http://backend:8008/api/trends");
    if (!response.ok) {
      throw new Error("Не удалось загрузить данные о трендах");
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

const groupTrendsByCategory = (trends) => {
  const seenTrends = new Set();
  
  return trends.reduce((acc, trend) => {
    const { category, name } = trend;

    if (seenTrends.has(name)) {
      return acc; 
    }

    seenTrends.add(name);

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(trend);
    return acc;
  }, {});
};

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

export default function Categories() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const fetchTrends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTrendsData();
      const trendsArray = Array.isArray(data) ? data : data.trends || [];
      
      const uniqueTrends = trendsArray.filter((trend, index, self) =>
        index === self.findIndex((t) => t.id === trend.id)
      );
      
      setTrends(uniqueTrends);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(uniqueTrends.map(trend => trend.category))];
      setCategories(uniqueCategories);
      
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

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const isFavorited = (trend) => {
    return favorites.some((fav) => fav.id === trend.id);
  };

  const groupedTrends = groupTrendsByCategory(trends);
  const categoryNames = Object.keys(groupedTrends);

  return (
    <Container className="categories-container">
      <div className="categories-header">
        <Typography variant="h3" component="h1" className="categories-title">
          Categories
        </Typography>
        <Typography variant="h6" component="h2" className="categories-subtitle">
          Explore trends by category
        </Typography>
      </div>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="trend categories"
            sx={{ mb: 3 }}
          >
            {categoryNames.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>

          {categoryNames.length > 0 && (
            <Grid container spacing={3}>
              {groupedTrends[categoryNames[selectedCategory]].map((trend) => (
                <Grid item xs={12} sm={6} md={4} key={trend.id}>
                  <TrendCard
                    trend={trend}
                    onFavoriteToggle={handleFavoriteToggle}
                    isFavorited={isFavorited(trend)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}