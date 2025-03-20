import React from "react";
import { useParams } from "react-router-dom";
import "./TrendInfo.css";

export default function TrendInfo() {
  const { trendName } = useParams(); // Получаем название тренда из URL

  return (
    <div className="trend-info-container">
      <h1 className="trend-title">Анализ тренда: {trendName}</h1>
      <p className="trend-description">
        🔍 Сбор данных по тренду <strong>{trendName}</strong>...
      </p>
      <div className="trend-content">
        <h3>📊 Графики популярности</h3>
        <p>Здесь будет график, показывающий, как этот тренд развивался.</p>

        <h3>📰 Актуальные статьи</h3>
        <p>Список новостей, связанных с этим трендом.</p>

        <h3>📢 Социальные обсуждения</h3>
        <p>Популярные посты из Twitter, Reddit и других платформ.</p>
      </div>
    </div>
  );
}
