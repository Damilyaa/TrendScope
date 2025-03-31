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

// Компонент для отображения отдельного тренда
const TrendCard = ({ trend }) => {
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
            <Typography variant="h6" component="h2" gutterBottom>
              {trend.name}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            {trend.description}
          </Typography>
          <Box mt={2}>
            <Chip
              label={`#${trend.tag[0]}`}
              color="primary"
              variant="outlined"
              size="small"
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

// Основной компонент Trends
export default function Trends() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = formatDate();

  // Функция для загрузки данных
  const fetchTrends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/trends");
      if (!response.ok) {
        throw new Error("Не удалось загрузить тренды");
      }
      const data = await response.json();
      setTrends(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  // Отображение индикатора загрузки
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

  // Отображение ошибки, если она произошла
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

  // Основное отображение трендов
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
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Актуальные технологические тренды
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
          {trends.map((trend) => (
            <Grid item xs={12} sm={6} md={4} key={trend.id}>
              <TrendCard trend={trend} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}