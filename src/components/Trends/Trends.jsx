import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
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
import PopupTrend from "../PopupTrend/PopupTrend";

const TrendCard = ({ trend, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card 
      className="trend-card"
      onClick={() => onClick(trend)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2" gutterBottom>
            {trend.title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {trend.description}
        </Typography>
        <Box mt={2}>
          <Chip 
            label={`#${trend.tag}`} 
            color="primary" 
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  </motion.div>
);

const trends = [
  {
    date: "21 марта 2025",
    topics: [
      {
        title: "Развитие искусственного интеллекта",
        tag: "AI",
        description: "Искусственный интеллект меняет индустрии, ускоряя автоматизацию и аналитику. Новые модели GPT-4 и DALL-E 3 открывают новые возможности для творчества и бизнеса.",
        articles: [
          { title: "Как AI трансформирует бизнес", link: "#" },
          { title: "Будущее GPT-5", link: "#" },
        ],
        chartData: [10, 40, 60, 90, 120],
      },
      {
        title: "Будущее квантовых вычислений",
        tag: "QuantumComputing",
        description: "Квантовые компьютеры обещают революцию в криптографии и науке о данных. Компании как Google и IBM активно развивают эту технологию.",
        articles: [
          { title: "Квантовые вычисления: что нас ждет?", link: "#" },
          { title: "Google и IBM в гонке за квантовое превосходство", link: "#" },
        ],
        chartData: [5, 15, 30, 55, 80],
      },
    ],
  },
];

export default function Trends() {
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [error, setError] = useState(null);

  const handleTrendClick = useCallback((trend) => {
    try {
      setSelectedTrend(trend);
      setError(null);
    } catch (err) {
      setError("Произошла ошибка при загрузке тренда");
      console.error("Error loading trend:", err);
    }
  }, []);

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => setError(null)}>
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
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Актуальные технологические тренды
        </Typography>

        {trends.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ 
                color: 'text.secondary',
                mb: 3,
                fontWeight: 500
              }}
            >
              {day.date}
            </Typography>

            <Grid container spacing={3}>
              {day.topics.map((trend, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <TrendCard trend={trend} onClick={handleTrendClick} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        ))}
      </motion.div>

      {selectedTrend && (
        <PopupTrend
          trend={selectedTrend}
          onClose={() => setSelectedTrend(null)}
        />
      )}
    </Container>
  );
}
