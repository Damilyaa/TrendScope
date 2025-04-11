import React from "react";
import { motion } from "framer-motion";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PsychologyIcon from "@mui/icons-material/Psychology";
import "./Home.css";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="hero">
          <Box className="hero-content">
            <Typography
              variant="h1"
              className="hero-title"
              sx={{
                background: "linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Trends Analyzer
            </Typography>
            <Typography variant="h5" className="hero-subtitle" sx={{ mb: 4, color: "#666" }}>
              Discover and analyze the latest trends with AI-powered insights
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/trends"
              className="cta-button"
              sx={{
                background: "linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)",
                color: "white",
                padding: "12px 32px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(45deg, #1a252f 30%, #2586b3 90%)",
                },
              }}
            >
              Start Exploring
            </Button>
          </Box>
        </Box>

        <Box className="how-it-works" sx={{ py: 8 }}>
          <Typography
            variant="h1"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: "linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="step-card">
                  <TrendingUpIcon sx={{ fontSize: 48, color: "#2c3e50", mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Trend Search
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Input keywords and get trend information with real-time data analysis
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="step-card">
                  <AnalyticsIcon sx={{ fontSize: 48, color: "#2c3e50", mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Data Analysis
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Explore detailed statistics, charts, and insights about trending topics
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="step-card">
                  <PsychologyIcon sx={{ fontSize: 48, color: "#2c3e50", mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    AI Predictions
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Leverage machine learning algorithms to predict emerging trends
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Box className="features" sx={{ py: 8, bgcolor: "#f8f9fa", borderRadius: "16px", mt: 4 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: "linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="feature-card">
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Data Visualizations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interactive charts and graphs for deep trend analysis
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="feature-card">
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    AI Algorithms
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precise data analysis powered by advanced AI
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="feature-card">
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Category Filters
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Browse trends across different categories
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="feature-card">
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Global Coverage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive data from around the world
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}
