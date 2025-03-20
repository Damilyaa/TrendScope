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
          <p>Инструмент для анализа трендов и прогнозирования популярных тем.</p>
          <a href="/trends" className="cta-button">Начать анализ</a>
        </div>
      </header>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>Как это работает</h2>
        <div className="steps">
          <div className="step">
            <h3>Поиск трендов</h3>
            <p>Вводите ключевые слова и получайте актуальные тренды в реальном времени.</p>
          </div>
          <div className="step">
            <h3>Анализ данных</h3>
            <p>Изучайте статистику и графики по темам, которые вас интересуют.</p>
          </div>
          <div className="step">
            <h3>Прогнозирование</h3>
            <p>Используйте алгоритмы машинного обучения для предсказания новых трендов.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Основные возможности</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h4>Визуализация данных</h4>
            <p>Графики и аналитика для глубокого понимания трендов.</p>
          </div>
          <div className="feature-item">
            <h4>Алгоритмы ИИ</h4>
            <p>Точные предсказания на основе анализа большого объёма данных.</p>
          </div>
          <div className="feature-item">
            <h4>Фильтрация по категориям</h4>
            <p>Отслеживайте тренды в разных сферах: технологии, экономика, культура.</p>
          </div>
          <div className="feature-item">
            <h4>Глобальный охват</h4>
            <p>Данные о трендах в разных странах и регионах.</p>
          </div>
        </div>
      </section>
    </div>
        </>
  );
}
