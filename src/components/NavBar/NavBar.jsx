import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/trend/${search}`);
      setSearch(""); 
    }
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
      <div className="auth">
        <Link to="/auth" className="nav-link">Auth</Link>
      </div>
    </nav>
  );
}
