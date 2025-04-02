import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">TrendScope</h2>
        <nav className="footer-nav">
          <a href="#" className="footer-link">Home</a>
          <a href="#" className="footer-link">Current trends</a>
          <a href="#" className="footer-link">Categories</a>
        </nav>
      </div>
      <p className="footer-copy">© 2025 TrendScope</p>
    </footer>
  );
}
