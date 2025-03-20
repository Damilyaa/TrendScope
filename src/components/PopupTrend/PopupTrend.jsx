import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./PopupTrend.css";

// Регистрация компонентов Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PopupTrend({ trend, onClose }) {
  const chartData = {
    labels: ["Янв", "Фев", "Мар", "Апр", "Май"],
    datasets: [
      {
        label: "Рост популярности",
        data: trend.chartData,
        borderColor: "#6c63ff",
        backgroundColor: "rgba(108, 99, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="popup-title">{trend.title}</h2>
        <p className="popup-description">{trend.description}</p>
        <div className="chart-container">
          <Line data={chartData} />
        </div>
        <h3>Актуальные статьи:</h3>
        <ul>
          {trend.articles.map((article, i) => (
            <li key={i}><a href={article.link}>{article.title}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
