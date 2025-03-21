import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Trends from "./components/Trends/Trends";
import Footer from "./components/Footer/Footer";
import TrendInfo from "./components/TrendInfo/TrendInfo";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/trend/:trendName" element={<TrendInfo />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}