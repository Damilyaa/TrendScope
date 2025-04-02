import React from "react";
import "./Home.css";


export default function Home() {
  return (
    <>
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Trends Analyzer</h1>
          <p>Tool for analyzing trends</p>
          <a href="/trends" className="cta-button">Start</a>
        </div>
      </header>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How does it work</h2>
        <div className="steps">
          <div className="step">
            <h3>Trend search</h3>
            <p>Input keywords and get related trend info</p>
          </div>
          <div className="step">
            <h3>Data analyzes</h3>
            <p>Discover statistics and related charts</p>
          </div>
          <div className="step">
            <h3>Прогнозирование</h3>
            <p>Используйте алгоритмы машинного обучения для предсказания новых трендов.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Main features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h4>Data visualisations</h4>
            <p>Charts and data for deep trend analyzes.</p>
          </div>
          <div className="feature-item">
            <h4>AI Algorithms</h4>
            <p>Exact data based on Big Data Analyzes</p>
          </div>
          <div className="feature-item">
            <h4>Filter by categories</h4>
            <p>Discover trends of different categories</p>
          </div>
          <div className="feature-item">
            <h4>Global reach</h4>
            <p>Data from all over the world</p>
          </div>
        </div>
      </section>
    </div>
        </>
  );
}
