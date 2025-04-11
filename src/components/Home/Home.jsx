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
            >
              Trends Analyzer
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Discover and analyze the latest trends with AI-powered insights
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/trends"
              className="cta-button"
            >
              Start Exploring
            </Button>
          </Box>
        </Box>

        <Box className="how-it-works">
          <Typography
            variant="h1"
            align="center"
            className="how-it-works-title"
          >
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="step-card">
                  <TrendingUpIcon />
                  <Typography variant="h5">
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
                  <AnalyticsIcon />
                  <Typography variant="h5">
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
                  <PsychologyIcon />
                  <Typography variant="h5">
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

        {/* <Box className="features">
          <Typography
            variant="h2"
            align="center"
            className="features-title"
          >
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box className="feature-card">
                  <Typography variant="h6">
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
                  <Typography variant="h6">
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
                  <Typography variant="h6">
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
                  <Typography variant="h6">
                    Global Coverage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive data from around the world
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box> */}
      </motion.div>
    </Container>
  );
}
