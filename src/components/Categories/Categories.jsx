import React, { useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import "./Categories.css";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { TrendingUp, ArrowForward } from "@mui/icons-material";

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Технологии",
    description: "Тренды в области технологий и инноваций",
    trendCount: 12,
    growth: "+15%",
    tags: ["AI", "Криптовалюта", "5G"],
  },
  {
    id: 2,
    name: "Мода",
    description: "Актуальные тренды в мире моды",
    trendCount: 8,
    growth: "+8%",
    tags: ["Устойчивая мода", "Минимализм", "Винтаж"],
  },
  {
    id: 3,
    name: "Здоровье",
    description: "Тренды в области здоровья и благополучия",
    trendCount: 10,
    growth: "+12%",
    tags: ["Ментальное здоровье", "Фитнес", "Питание"],
  },
  {
    id: 4,
    name: "Образование",
    description: "Тренды в сфере образования",
    trendCount: 6,
    growth: "+5%",
    tags: ["Онлайн-обучение", "EdTech", "Микрообучение"],
  },
  {
    id: 5,
    name: "Бизнес",
    description: "Тренды в мире бизнеса и предпринимательства",
    trendCount: 9,
    growth: "+10%",
    tags: ["Удаленная работа", "ESG", "Инновации"],
  },
  {
    id: 6,
    name: "Развлечения",
    description: "Тренды в сфере развлечений",
    trendCount: 7,
    growth: "+7%",
    tags: ["Стриминг", "Гейминг", "VR/AR"],
  },
];

const CategoryCard = memo(({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="category-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {category.description}
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{
                color: "primary.main",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {category.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "rgba(124, 158, 171, 0.04)",
                  },
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {category.trendCount} трендов
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.main",
              }}
            >
              <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2">{category.growth}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
});

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    trendCount: PropTypes.number.isRequired,
    growth: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Categories = () => {
  return (
    <div className="categories-container">
      <div className="categories-header">
        <Typography variant="h4" gutterBottom>
          Категории трендов
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Исследуйте тренды по категориям и находите новые возможности
        </Typography>
      </div>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories; 