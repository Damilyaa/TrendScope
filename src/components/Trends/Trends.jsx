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
import { formatDate } from "../../utils/dateUtils";

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
            {trend.name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {trend.description}
        </Typography>
        <Box mt={2}>
          <Chip 
            label={`#${trend.tags[0]}`} 
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
    id: 1,
    name: "Искусственный интеллект в бизнесе",
    description: "Как ИИ трансформирует бизнес-процессы",
    category: "Технологии",
    growth: "+25%",
    tags: ["AI", "Бизнес", "Инновации"],
    chartData: [30, 45, 60, 75, 85],
  },
  {
    id: 2,
    name: "Устойчивая мода",
    description: "Экологически ответственный подход к моде",
    category: "Мода",
    growth: "+18%",
    tags: ["Экология", "Мода", "Устойчивость"],
    chartData: [20, 35, 45, 55, 65],
  },
  {
    id: 3,
    name: "Ментальное здоровье",
    description: "Важность психологического благополучия",
    category: "Здоровье",
    growth: "+22%",
    tags: ["Психология", "Здоровье", "Благополучие"],
    chartData: [25, 40, 55, 70, 80],
  },
  {
    id: 4,
    name: "Микрообучение",
    description: "Короткие форматы обучения для быстрого развития",
    category: "Образование",
    growth: "+15%",
    tags: ["Обучение", "EdTech", "Развитие"],
    chartData: [15, 30, 45, 60, 70],
  },
  {
    id: 5,
    name: "ESG-инвестиции",
    description: "Инвестиции в экологически ответственные компании",
    category: "Бизнес",
    growth: "+20%",
    tags: ["Инвестиции", "ESG", "Устойчивость"],
    chartData: [35, 50, 65, 80, 90],
  },
  {
    id: 6,
    name: "VR в развлечениях",
    description: "Виртуальная реальность в индустрии развлечений",
    category: "Развлечения",
    growth: "+28%",
    tags: ["VR", "Гейминг", "Технологии"],
    chartData: [40, 55, 70, 85, 95],
  },
];

export default function Trends() {
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [error, setError] = useState(null);
  const currentDate = formatDate();

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
          {currentDate}
        </Typography>

        <Grid container spacing={3}>
          {trends.map((trend) => (
            <Grid item xs={12} sm={6} md={4} key={trend.id}>
              <TrendCard trend={trend} onClick={handleTrendClick} />
            </Grid>
          ))}
        </Grid>
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
