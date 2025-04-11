import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

const FavoriteCard = ({ trend, onFavoriteToggle }) => {
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
              color="favorites"
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

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleFavoriteToggle = async (trend) => {
    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trendId: trend.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }

      setFavorites(prevFavorites => 
        prevFavorites.filter(fav => fav.id !== trend.id)
      );
    } catch (err) {
      setError(err.message);
    }
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
          Favorites
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
          Your saved trends
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
      ) : favorites.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          You haven't saved any trends yet.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((trend) => (
            <Grid item xs={12} sm={6} md={4} key={trend.id}>
              <FavoriteCard
                trend={trend}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
