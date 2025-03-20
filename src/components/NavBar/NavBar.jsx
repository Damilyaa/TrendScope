import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/trend/${search}`);
      setSearch(""); // Очистка поля поиска
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TrendScope</h2>
      <div className="nav-links">
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/trends" className="nav-link">Тренды</Link>
        <Link to="/categories" className="nav-link">Категории</Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Искать тренды..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </nav>
  );
}
