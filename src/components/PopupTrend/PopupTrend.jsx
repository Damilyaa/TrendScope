import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Link,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArticleIcon from "@mui/icons-material/Article";
import "./PopupTrend.css";

// Регистрация компонентов Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PopupTrend({ trend, onClose }) {
  const chartData = {
    labels: ["Янв", "Фев", "Мар", "Апр", "Май"],
    datasets: [
      {
        label: "Рост популярности",
        data: trend.chartData,
        borderColor: "#7C9EAB",
        backgroundColor: "rgba(124, 158, 171, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#7C9EAB",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(74, 74, 74, 0.9)",
        padding: 12,
        titleFont: {
          size: 14,
          color: "#fff",
        },
        bodyFont: {
          size: 13,
          color: "#fff",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 233, 236, 0.5)",
        },
        ticks: {
          font: {
            size: 12,
            color: "#7C9EAB",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            color: "#7C9EAB",
          },
        },
      },
    },
  };

  return (
    <AnimatePresence>
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperComponent={motion.div}
        PaperProps={{
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          transition: { duration: 0.2 },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Box display="flex" alignItems="center" gap={1}>
            <TrendingUpIcon color="primary" />
            <Typography variant="h6" component="h2">
              {trend.title}
            </Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Box mb={3}>
            <Chip 
              label={`#${trend.tag}`} 
              color="primary" 
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            <Typography variant="body1" color="text.secondary" paragraph>
              {trend.description}
            </Typography>
          </Box>

          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: 'background.default',
              borderRadius: 2,
              height: 300
            }}
          >
            <Line data={chartData} options={chartOptions} />
          </Paper>

          <Box>
            <Typography 
              variant="h6" 
              component="h3" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mb: 2
              }}
            >
              <ArticleIcon color="primary" />
              Актуальные статьи
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {trend.articles.map((article, i) => (
                <Box 
                  component="li" 
                  key={i}
                  sx={{ 
                    mb: 1.5,
                    '&:last-child': { mb: 0 }
                  }}
                >
                  <Link 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {article.title}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Box sx={{ flex: 1 }} />
          <Chip 
            label="Поделиться" 
            color="primary" 
            variant="outlined"
            onClick={() => {/* Add share functionality */}}
          />
        </DialogActions>
      </Dialog>
    </AnimatePresence>
  );
}
