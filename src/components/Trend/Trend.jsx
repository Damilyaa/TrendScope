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
import "./Trend.css";

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
  
      // Ensure 'trends' is an array and is available
     
  
      const trends = data.trends;
      const foundTrend = trends.find((t) => t.name === decodeURIComponent(trendName));
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
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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

  if (!trend) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6">No trends find</Typography>
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              {trend.name}
            </Typography>
          </Box>
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                bgcolor: "background.default",
                borderRadius: 2,
                height: 400,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Popularity chart
              </Typography>
              <Line data={chartData} options={chartOptions} />
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <ArticleIcon color="primary" />
                Articles
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {trend.articles.map((article, i) => (
                  <Box
                    component="li"
                    key={i}
                    sx={{ mb: 2, "&:last-child": { mb: 0 } }}
                  >
                    <Typography
                      component="a"
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {article.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                Social media
              </Typography>
              {trend.socialPosts.map((post, i) => (
                <Card
                  key={i}
                  sx={{
                    mb: 2,
                    "&:last-child": { mb: 0 },
                    bgcolor: "background.default",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
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
                      component="a"
                    >
                      Learn more
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={() => {
              /* Add share functionality */
            }}
          >
            Share
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
}
