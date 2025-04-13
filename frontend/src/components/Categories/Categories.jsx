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
    const response = await fetch("http://localhost:8008/api/trends");
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
        sx={{
          cursor: 'pointer',
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #254668, #30a7d2)',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease'
          },
          '&:hover::before': {
            transform: 'scaleX(1)'
          },
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            transform: 'translateY(-4px)'
          },
          '@media (max-width: 600px)': {
            height: 'auto'
          }
        }}
        onClick={handleClick}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'start',
            marginBottom: '16px'
          }}>
            <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2" sx={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#254668',
              marginRight: '8px'
            }}>
              {trend.name}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();  
                onFavoriteToggle(trend);
              }}
              color={isFavorited ? "favorites" : "default"}
              sx={{
                position: 'relative',
                top: '-15px'
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{
            color: 'rgba(26, 77, 128, 0.78)'
          }} paragraph>
            {trend.description}
          </Typography>
          <Box mt={2}>
            <Chip
              label={`#${trend.tag[0]}`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{
                color: 'rgba(26, 77, 128, 0.78)'
              }}
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
    <Container sx={{
      padding: '1rem 2rem 2rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'start',
      '@media (max-width: 768px)': {
        padding: '1rem'
      }
    }}>
      <div style={{
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <Typography variant="h3" component="h1" sx={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#254668',
          textAlign: 'center',
          position: 'relative',
          paddingBottom: '15px',
          '@media (max-width: 768px)': {
            fontSize: '2rem'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, #254668, #30a7d2)',
            borderRadius: '3px'
          }
        }}>
          Categories
        </Typography>
        <Typography variant="h6" component="h2" sx={{
          fontSize: '1.2rem',
          color: '#666',
          marginBottom: '2rem',
          textAlign: 'center',
          '@media (max-width: 768px)': {
            fontSize: '1rem'
          }
        }}>
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
        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          marginBottom: '3rem',
          borderRadius: '10px',
          boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)'
        }}>
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
        </div>
      )}
    </Container>
  );
}