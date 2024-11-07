// src/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const goToShapes = () => {
    navigate("/shapes");
  };

  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <p>Este es un demo de Three.js en React</p>
      <button onClick={goToShapes} className="home-button">
        Ver las Formas 3D
      </button>
    </div>
  );
};

export default Home;
