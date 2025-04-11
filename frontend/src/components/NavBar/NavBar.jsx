import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from '@mui/icons-material/Search';
import { motion } from "framer-motion";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/trend/${search}`);
      setSearch(""); 
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    navigate("/auth");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '1.2rem 2rem',
        borderRadius: '32px',
        width: '80%',
        maxWidth: '1800px',
        margin: '0 auto',
        marginTop: '1.5rem',
        maxHeight: '6.5rem',
        position: 'relative',
        zIndex: 1000,
        border: '1px solid rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.95)'
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogoClick}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            margin: 0,
            cursor: 'pointer',
            letterSpacing: '-0.5px',
            position: 'relative'
          }}>TrendScope</h2>
        </Link>
      </motion.div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3.5rem',
        marginLeft: '8rem',
        '@media (max-width: 768px)': {
          gap: '2rem',
          marginLeft: '2rem'
        }
      }}>
        {[
          { path: "/", label: "Home" },
          { path: "/trends", label: "Current trends" },
          { path: "/categories", label: "Categories" },
          { path: "/favorites", label: "Favorites" }
        ].map((item) => (
          <motion.div
            key={item.path}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Link to={item.path} style={{
              textDecoration: 'none',
              color: '#254668',
              fontSize: '1.3rem',
              fontWeight: 600,
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              padding: '0.5rem 0',
              '@media (max-width: 768px)': {
                fontSize: '1.1rem'
              }
            }}>
              {item.label}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '0%',
                height: '2px',
                background: 'linear-gradient(45deg, #2c3e50 30%, #30a7d2 90%)',
                transition: 'width 0.3s ease',
                width: '0%'
              }}></span>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* 
      <div style={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        maxWidth: '300px',
        '@media (max-width: 768px)': {
          maxWidth: '200px'
        }
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          minWidth: '300px',
          '@media (max-width: 768px)': {
            minWidth: '200px'
          }
        }}>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              fontSize: '0.9rem',
              border: isSearchFocused 
                ? '0.15rem solid #30a7d2' 
                : '0.15rem solid rgba(37, 71, 104, 0.2)',
              borderRadius: '16px',
              outline: 'none',
              transition: 'all 0.3s ease',
              background: isSearchFocused 
                ? 'rgba(48, 167, 210, 0.05)' 
                : 'rgba(37, 71, 104, 0.05)',
              boxShadow: isSearchFocused 
                ? '0 0 0 3px rgba(48, 167, 210, 0.1)' 
                : 'none'
            }}
            placeholder="🔍 Search trend..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <SearchIcon style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isSearchFocused ? '#30a7d2' : 'rgba(37, 71, 104, 0.5)',
            fontSize: '1.2rem'
          }} />
        </div>
      </div>
      */}
      
      {/* 
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1rem'
      }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            onClick={handleProfileMenuOpen}
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            style={{
              background: 'linear-gradient(45deg, rgba(44, 62, 80, 0.1) 30%, rgba(48, 167, 210, 0.1) 90%)',
              borderRadius: '50%',
              padding: '0.5rem',
              transition: 'all 0.3s ease',
              ':hover': {
                background: 'linear-gradient(45deg, rgba(44, 62, 80, 0.2) 30%, rgba(48, 167, 210, 0.2) 90%)'
              }
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 32, color: "#254668" }} />
          </IconButton>
        </motion.div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          sx={{
            '& .MuiPaper-root': {
              marginTop: '0.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              overflow: 'hidden'
            },
            '& .MuiMenuItem-root': {
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
              color: '#254668',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(48, 167, 210, 0.1)',
                color: '#30a7d2'
              }
            }
          }}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleProfileClick}>Login</MenuItem>
        </Menu>
      </div>
      */}
    </motion.nav>
  );
}
