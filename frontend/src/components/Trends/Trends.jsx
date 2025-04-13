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
      const response = await fetch("http://localhost:8008/api/trends");
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
          Current Trends
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
          Discover what's trending today
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
          <div style={{
            background: '#f5f5f5',
            padding: '20px',
            marginBottom: '3rem',
            borderRadius: '10px',
            boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h5" sx={{
              fontSize: '1.5rem',
              color: '#666',
              marginBottom: '1.5rem'
            }}>
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
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem'
            }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLoadMore}
                sx={{
                  background: '#254668',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    background: '#1a365d'
                  }
                }}
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
