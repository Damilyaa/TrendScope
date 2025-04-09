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
              color={isFavorited ? "favorites" : "default"}
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
    // Initialize favorites from localStorage (if any)
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const currentDate = formatDate();

  const fetchTrends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/trends");
      if (!response.ok) {
        throw new Error("Не удалось загрузить тренды");
      }
      const data = await response.json();
      const trendsArray = Array.isArray(data) ? data : data.trends || [];
  
      // Remove duplicates based on trend id
      const uniqueTrends = trendsArray.filter((trend, index, self) =>
        index === self.findIndex((t) => t.id === trend.id)
      );
  
      setTrends(uniqueTrends);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  const handleFavoriteToggle = (trend) => {
    const isAlreadyFavorited = favorites.some((fav) => fav.id === trend.id);
    let updatedFavorites;
    
    if (isAlreadyFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.id !== trend.id);
    } else {
      updatedFavorites = [...favorites, trend];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchTrends}>
              Попробовать снова
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

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
          Current trends
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            color: "text.secondary",
            mb: 3,
            fontWeight: 500,
          }}
        >
          {currentDate}
        </Typography>

        <Grid container spacing={3}>
          {trends.slice(0, limit).map((trend) => (
            <Grid item xs={12} sm={6} md={4} key={trend.id}>
              <TrendCard
                trend={trend}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={favorites.some((fav) => fav.id === trend.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={2} display="flex" justifyContent="center">
          {limit < trends.length && (
            <Button
              variant="contained"
              onClick={() => setLimit(limit + 9)}
              sx={{ mr: 2 }}
            >
              Show more
            </Button>
          )}
        </Box>
      </motion.div>
    </Container>
  );
}
