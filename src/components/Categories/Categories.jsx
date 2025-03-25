import React, { useState } from "react";
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
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "./Categories.css";

// Mock data structure for categories and their associated trends
const categoriesData = [
  {
    id: "tech",
    name: "Технологии",
    trends: [
      {
        id: 1,
        name: "Искусственный интеллект в бизнесе",
        description: "Как ИИ трансформирует бизнес-процессы",
        growth: "+25%",
        tags: ["AI", "Бизнес", "Инновации"],
      },
      {
        id: 2,
        name: "VR в развлечениях",
        description: "Виртуальная реальность в индустрии развлечений",
        growth: "+28%",
        tags: ["VR", "Гейминг", "Технологии"],
      },
      {
        id: 7,
        name: "Квантовые вычисления",
        description: "Развитие квантовых технологий и их применение",
        growth: "+32%",
        tags: ["Квантовые вычисления", "Физика", "Инновации"],
      },
    ],
  },
  {
    id: "politics",
    name: "Политика",
    trends: [
      {
        id: 8,
        name: "Климатическая политика",
        description: "Глобальные инициативы по борьбе с изменением климата",
        growth: "+20%",
        tags: ["Климат", "Политика", "Устойчивость"],
      },
      {
        id: 9,
        name: "Цифровая демократия",
        description: "Использование технологий в политических процессах",
        growth: "+15%",
        tags: ["Демократия", "Технологии", "Политика"],
      },
    ],
  },
  {
    id: "education",
    name: "Образование",
    trends: [
      {
        id: 5,
        name: "Микрообучение",
        description: "Короткие форматы обучения для быстрого развития",
        growth: "+15%",
        tags: ["Обучение", "EdTech", "Развитие"],
      },
      {
        id: 10,
        name: "Гибридное обучение",
        description: "Сочетание онлайн и офлайн форматов в образовании",
        growth: "+22%",
        tags: ["Образование", "EdTech", "Инновации"],
      },
      {
        id: 11,
        name: "Персонализированное обучение",
        description: "Адаптивные образовательные программы",
        growth: "+18%",
        tags: ["Обучение", "AI", "Образование"],
      },
    ],
  },
  {
    id: "health",
    name: "Здоровье",
    trends: [
      {
        id: 4,
        name: "Ментальное здоровье",
        description: "Важность психологического благополучия",
        growth: "+22%",
        tags: ["Психология", "Здоровье", "Благополучие"],
      },
      {
        id: 12,
        name: "Телемедицина",
        description: "Развитие дистанционных медицинских услуг",
        growth: "+30%",
        tags: ["Медицина", "Технологии", "Здоровье"],
      },
      {
        id: 13,
        name: "Персонализированная медицина",
        description: "Индивидуальный подход к лечению",
        growth: "+25%",
        tags: ["Медицина", "Генетика", "Здоровье"],
      },
    ],
  },
  {
    id: "business",
    name: "Бизнес",
    trends: [
      {
        id: 6,
        name: "ESG-инвестиции",
        description: "Инвестиции в экологически ответственные компании",
        growth: "+20%",
        tags: ["Инвестиции", "ESG", "Устойчивость"],
      },
      {
        id: 14,
        name: "Удаленная работа",
        description: "Трансформация офисной культуры",
        growth: "+35%",
        tags: ["Работа", "Технологии", "Бизнес"],
      },
      {
        id: 15,
        name: "Цифровая трансформация",
        description: "Переход бизнеса в цифровое пространство",
        growth: "+28%",
        tags: ["Технологии", "Бизнес", "Инновации"],
      },
    ],
  },
  {
    id: "fashion",
    name: "Мода",
    trends: [
      {
        id: 3,
        name: "Устойчивая мода",
        description: "Экологически ответственный подход к моде",
        growth: "+18%",
        tags: ["Экология", "Мода", "Устойчивость"],
      },
      {
        id: 16,
        name: "Цифровая мода",
        description: "Виртуальная одежда и NFT в индустрии моды",
        growth: "+25%",
        tags: ["Мода", "NFT", "Технологии"],
      },
    ],
  },
  {
    id: "sports",
    name: "Спорт",
    trends: [
      {
        id: 17,
        name: "Электронный спорт",
        description: "Развитие киберспорта и его влияние",
        growth: "+40%",
        tags: ["Киберспорт", "Гейминг", "Спорт"],
      },
      {
        id: 18,
        name: "Фитнес-технологии",
        description: "Применение технологий в фитнесе",
        growth: "+22%",
        tags: ["Фитнес", "Технологии", "Здоровье"],
      },
    ],
  },
  {
    id: "entertainment",
    name: "Развлечения",
    trends: [
      {
        id: 19,
        name: "Стриминговые сервисы",
        description: "Эволюция цифровых развлечений",
        growth: "+30%",
        tags: ["Стриминг", "Развлечения", "Технологии"],
      },
      {
        id: 20,
        name: "Метавселенная",
        description: "Развитие виртуальных миров",
        growth: "+45%",
        tags: ["VR", "Метавселенная", "Технологии"],
      },
    ],
  },
  {
    id: "science",
    name: "Наука",
    trends: [
      {
        id: 21,
        name: "Исследования космоса",
        description: "Новые открытия в космической науке",
        growth: "+25%",
        tags: ["Космос", "Наука", "Исследования"],
      },
      {
        id: 22,
        name: "Биоинженерия",
        description: "Развитие биотехнологий",
        growth: "+28%",
        tags: ["Биоинженерия", "Наука", "Технологии"],
      },
    ],
  },
  {
    id: "environment",
    name: "Экология",
    trends: [
      {
        id: 23,
        name: "Возобновляемая энергетика",
        description: "Развитие зеленых технологий",
        growth: "+35%",
        tags: ["Энергетика", "Экология", "Устойчивость"],
      },
      {
        id: 24,
        name: "Циклическая экономика",
        description: "Переход к экономике замкнутого цикла",
        growth: "+20%",
        tags: ["Экономика", "Экология", "Устойчивость"],
      },
    ],
  },
];

// Reusable card component for displaying individual trends
const TrendCard = ({ trend }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trend/${encodeURIComponent(trend.name)}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="trend-card"
        onClick={handleClick}
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
          <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
            {trend.tags.map((tag, index) => (
              <Chip 
                key={index}
                label={`#${tag}`} 
                color="primary" 
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
          <Typography 
            variant="body2" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Рост: {trend.growth}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Подробнее
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

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
          Категории трендов
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="category tabs"
          >
            {categoriesData.map((category, index) => (
              <Tab 
                key={category.id}
                label={category.name}
                id={`category-tab-${index}`}
                aria-controls={`category-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>

        <Box role="tabpanel" id={`category-tabpanel-${selectedCategory}`}>
          <Grid container spacing={3}>
            {categoriesData[selectedCategory].trends.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend.id}>
                <TrendCard trend={trend} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
} 