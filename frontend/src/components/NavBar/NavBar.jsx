import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./NavBar.css";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
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

  return (
    <nav className="navbar">
      <h2 className="logo">TrendScope</h2>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/trends" className="nav-link">Current trends</Link>
        <Link to="/categories" className="nav-link">Categories</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search trend..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      {/* <div className="profile-container">
        <IconButton
          onClick={handleProfileMenuOpen}
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon sx={{ fontSize: 32, color: "#254668" }} />
        </IconButton>
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
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleProfileClick}>Login</MenuItem>
        </Menu>
      </div> */}
    </nav>
  );
}
