import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">TrendScope</h2>
        <nav className="footer-nav">
          <a href="#" className="footer-link">О нас</a>
          <a href="#" className="footer-link">Контакты</a>
          <a href="#" className="footer-link">Политика конфиденциальности</a>
        </nav>
      </div>
      <p className="footer-copy">© 2025 TrendScope. Все права защищены.</p>
    </footer>
  );
}
