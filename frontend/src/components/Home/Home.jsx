import React from "react";
import { motion } from "framer-motion";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PsychologyIcon from "@mui/icons-material/Psychology";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{
      textAlign: 'center',
      padding: '3rem 2rem',
      maxWidth: '1250px',
      margin: '0 auto',
      fontFamily: '"Inter", sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{
          height: '30rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(203, 216, 229, 0.783) 0%, rgba(145, 193, 209, 0.549) 100%)',
          borderRadius: '24px',
          marginTop: '4rem',
          '@media (max-width: 768px)': {
            minHeight: '60vh',
            padding: '3rem 1rem'
          }
        }}>
          <Box sx={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '4rem !important',
                fontWeight: '800 !important',
                marginBottom: '16px',
                lineHeight: '1.2 !important',
                background: 'linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '@media (max-width: 768px)': {
                  fontSize: '2.5rem !important'
                }
              }}
            >
              Trends Analyzer
            </Typography>
            <Typography variant="h5" sx={{
              fontSize: '1.5rem !important',
              color: '#435f75',
              marginTop: '3.5rem',
              marginBottom: '32px',
              lineHeight: '1.5 !important',
              '@media (max-width: 768px)': {
                fontSize: '1.2rem !important'
              }
            }}>
              Discover and analyze the latest trends with AI-powered insights
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/trends"
              sx={{
                background: 'linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)',
                color: 'white',
                padding: '12px 32px',
                fontSize: '1.2rem',
                borderRadius: '8px',
                textTransform: 'none',
                marginTop: '3rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1a252f 10%, #2586b3 90%)'
                }
              }}
            >
              Start Exploring
            </Button>
          </Box>
        </Box>

        <Box sx={{
          marginTop: '2rem',
          marginBottom: '4rem'
        }}>
          <Typography
            variant="h1"
            align="center"
            sx={{
              marginBottom: '32px',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box sx={{
                  padding: '24px',
                  textAlign: 'center',
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  '@media (max-width: 768px)': {
                    padding: '1.5rem'
                  }
                }}>
                  <TrendingUpIcon sx={{
                    fontSize: '48px',
                    color: '#2c3e50',
                    marginBottom: '16px'
                  }} />
                  <Typography variant="h5" sx={{
                    marginBottom: '16px',
                    fontWeight: 600
                  }}>
                    Trend Search
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Look for the trend that interests you by its categorie
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Box sx={{
                  padding: '24px',
                  textAlign: 'center',
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  '@media (max-width: 768px)': {
                    padding: '1.5rem'
                  }
                }}>
                  <AnalyticsIcon sx={{
                    fontSize: '48px',
                    color: '#2c3e50',
                    marginBottom: '16px'
                  }} />
                  <Typography variant="h5" sx={{
                    marginBottom: '16px',
                    fontWeight: 600
                  }}>
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
                <Box sx={{
                  padding: '24px',
                  textAlign: 'center',
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  '@media (max-width: 768px)': {
                    padding: '1.5rem'
                  }
                }}>
                  <PsychologyIcon sx={{
                    fontSize: '48px',
                    color: '#2c3e50',
                    marginBottom: '16px'
                  }} />
                  <Typography variant="h5" sx={{
                    marginBottom: '16px',
                    fontWeight: 600
                  }}>
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
      </motion.div>
    </Container>
  );
}
