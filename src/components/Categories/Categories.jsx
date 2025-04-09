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
    const response = await fetch("http://localhost:8080/api/trends");
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

export default function Categories() {
  const [groupedTrends, setGroupedTrends] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
      // Initialize favorites from localStorage (if any)
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
  

  const fetchTrends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTrendsData();
      if (data && data.trends) {
        const grouped = groupTrendsByCategory(data.trends);
        setGroupedTrends(grouped);

        const categories = Object.keys(grouped);
        if (categories.length > 0) {
          setSelectedCategory(categories[0]); 
        }
      }
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

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
              Try again
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
          Categories
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="category tabs"
          >
            {Object.keys(groupedTrends).map((category) => (
              <Tab
                key={category}
                label={category}
                value={category}
                id={`category-tab-${category}`}
                aria-controls={`category-tabpanel-${category}`}
              />
            ))}
          </Tabs>
        </Box>

        {selectedCategory && (
          <Box role="tabpanel" id={`category-tabpanel-${selectedCategory}`}>
            <Grid container spacing={3}>
              {groupedTrends[selectedCategory].map((trend) => (
                <Grid item xs={12} sm={6} md={4} key={trend.id}>
                  <TrendCard
                trend={trend}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={favorites.some((fav) => fav.id === trend.id)}
              />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </motion.div>
    </Container>
  );
}
