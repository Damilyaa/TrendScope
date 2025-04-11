import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArticleIcon from "@mui/icons-material/Article";
import ShareIcon from "@mui/icons-material/Share";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./TrendInfo.css";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TrendInfo() {
  const { trendName } = useParams();
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/trends");
      if (!response.ok) {
        throw new Error("Не удалось загрузить данные о трендах");
      }
      const data = await response.json();
      console.log("Полученные данные:", data);
      const foundTrend = data.find((t) => t.name === decodeURIComponent(trendName));
      if (!foundTrend) {
        throw new Error(`Тренд "${trendName}" не найден`);
      }
      setTrend(foundTrend);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendData();
  }, [trendName]);

  if (loading) {
    return (
      <Container className="loading-container">
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
            <Button color="inherit" size="small" onClick={fetchTrendData}>
              Try again
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Рост популярности",
        data: trend.chartData || [],
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
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(74, 74, 74, 0.9)",
        padding: 12,
        titleFont: { size: 14, color: "#fff" },
        bodyFont: { size: 13, color: "#fff" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(229, 233, 236, 0.5)" },
        ticks: { font: { size: 12, color: "#7C9EAB" } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, color: "#7C9EAB" } },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box className="trend-header">
          <Box className="trend-title-container">
            <TrendingUpIcon color="primary" className="trend-icon" />
            <Typography variant="h4" component="h1" gutterBottom>
              {trend.name}
            </Typography>
          </Box>
          <Chip
            label={`#${trend.tag}`}
            color="primary"
            variant="outlined"
            size="small"
            className="trend-tag"
          />
          <Typography variant="body1" color="text.secondary" paragraph>
            {trend.description}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} className="chart-container">
              <Typography variant="h6" className="chart-title">
                Popaulerity chart
              </Typography>
              <Line data={chartData} options={chartOptions} />
            </Paper>

            <Paper elevation={0} className="articles-container">
              <Typography variant="h6" className="articles-title">
                <ArticleIcon color="primary" />
                Articles
              </Typography>
              <Box component="ul" className="articles-list">
                {trend.articles.map((article, i) => (
                  <Box component="li" key={i} className="article-item">
                    <Typography
                      component="a"
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-link"
                    >
                      {article.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} className="social-container">
              <Typography variant="h6" className="social-title">
                Social media
              </Typography>
              {trend.socialPosts.map((post, i) => (
                <Card key={i} className="social-card">
                  <CardContent>
                    <Box className="social-header">
                      {post.platform === "Twitter" && (
                        <TwitterIcon color="primary" />
                      )}
                      {post.platform === "Reddit" && (
                        <RedditIcon color="primary" />
                      )}
                      {post.platform === "LinkedIn" && (
                        <LinkedInIcon color="primary" />
                      )}
                      <Typography variant="subtitle2" color="text.secondary">
                        {post.platform}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{post.content}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View post
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>

        {/* <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={() => {
              
            }}
          >
            Share
          </Button>
        </Box> */}
      </Container>
    </motion.div>
  );
}