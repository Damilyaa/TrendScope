import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
// import Auth from "./components/Auth/Auth";
import Favorites from "./components/Favorites/Favorites";

const Home = React.lazy(() => import("./components/Home/Home"));
const Trends = React.lazy(() => import("./components/Trends/Trends"));
const TrendInfo = React.lazy(() => import("./components/TrendInfo/TrendInfo"));
const Trend = React.lazy(() => import("./components/Trend/Trend"));
const Categories = React.lazy(() => import("./components/Categories/Categories"));
const theme = createTheme({
  palette: {
    primary: {
      main: "#7C9EAB", // Soft blue-gray
      light: "#A5C0D3",
      dark: "#5C7A8A",
    },
    secondary: {
      main: "#B5A9BD", // Soft lavender
      light: "#D4CCD9",
      dark: "#8A7F94",
    },
    background: {
      default: "#F5F7F9", // Very light blue-gray
      paper: "#FFFFFF",
    },
    favorites: {
      main: "#b51b2f",

    },
    text: {
      primary: "#4A4A4A", // Soft dark gray
      secondary: "#7C9EAB", 
    },
    divider: "#E5E9EC", // Light gray for dividers
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      color: "#4A4A4A",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
      color: "#4A4A4A",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
      color: "#4A4A4A",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      color: "#4A4A4A",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: "#4A4A4A",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: "#4A4A4A",
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: "#4A4A4A",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      color: "#4A4A4A",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: "#4A4A4A",
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: "#7C9EAB",
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      color: "#7C9EAB",
      letterSpacing: '0.02em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: "#7C9EAB",
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          border: "1px solid #E5E9EC",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
          '&:hover': {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        outlined: {
          borderColor: "#7C9EAB",
          color: "#7C9EAB",
          '&:hover': {
            borderColor: "#5C7A8A",
            backgroundColor: "rgba(124, 158, 171, 0.04)",
          },
        },
        contained: {
          backgroundColor: "#7C9EAB",
          '&:hover': {
            backgroundColor: "#5C7A8A",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 24,
          '&.MuiChip-outlined': {
            borderColor: "#7C9EAB",
            color: "#7C9EAB",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--background-default)'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid var(--primary-light)',
      borderTop: '4px solid var(--primary-main)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          position: 'relative'
        }}>
          <NavBar />
          <main style={{
            flex: 1,
            padding: '0 2rem 2rem 2rem',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            '@media (max-width: 768px)': {
              padding: '1rem'
            }
          }}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trends" element={<Trends />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/trend/:trendName" element={<Trend />} />
                <Route path="/favorites" element={<Favorites />} />
                {/* <Route path="/auth" element={<Auth />} /> */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}