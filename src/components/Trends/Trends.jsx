import React, { useState } from "react";
import "./Trends.css";
import PopupTrend from "../PopupTrend/PopupTrend";

const trends = [
  {
    date: "21 марта 2025",
    topics: [
      {
        title: "Развитие искусственного интеллекта",
        tag: "AI",
        description: "Искусственный интеллект меняет индустрии, ускоряя автоматизацию и аналитику.",
        articles: [
          { title: "Как AI трансформирует бизнес", link: "#" },
          { title: "Будущее GPT-5", link: "#" },
        ],
        chartData: [10, 40, 60, 90, 120],
      },
      {
        title: "Будущее квантовых вычислений",
        tag: "QuantumComputing",
        description: "Квантовые компьютеры обещают революцию в криптографии и науке о данных.",
        articles: [
          { title: "Квантовые вычисления: что нас ждет?", link: "#" },
          { title: "Google и IBM в гонке за квантовое превосходство", link: "#" },
        ],
        chartData: [5, 15, 30, 55, 80],
      },
    ],
  },
];

export default function Trends() {
  const [selectedTrend, setSelectedTrend] = useState(null);

  return (
    <div className="trends-container">
      <h1 className="trends-title">Актуальные технологические тренды</h1>
      {trends.map((day, index) => (
        <div key={index} className="trends-day">
          <h2 className="trends-date">{day.date}</h2>
          <div className="trends-list">
            {day.topics.map((trend, i) => (
              <div key={i} className="trend-card" onClick={() => setSelectedTrend(trend)}>
                <div className="trend-title">{trend.title}</div>
                <div className="trend-tag">#{trend.tag}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedTrend && <PopupTrend trend={selectedTrend} onClose={() => setSelectedTrend(null)} />}
    </div>
  );
}
