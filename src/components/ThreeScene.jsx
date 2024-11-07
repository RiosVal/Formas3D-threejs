// src/components/ThreeScene.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const isDarkBackground = useRef(false);

  useEffect(() => {
    // Configurar la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Materiales y geometrías
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0x0077ff,
    });
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });

    const cube = new THREE.Mesh(new THREE.BoxGeometry(), cubeMaterial);
    cube.position.x = -2;
    scene.add(cube);

    const cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
      cylinderMaterial
    );
    scene.add(cylinder);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      sphereMaterial
    );
    sphere.position.set(2, 0, 0);
    scene.add(sphere);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    let hue = 0;
    let initialPositionY = 0;
    let bounceHeight = 2;
    let velocityY = 0.05;
    const gravity = 0.002;
    let isSphereClicked = false;
    let isCylinderClicked = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      hue += 0.01;
      if (hue > 1) hue = 0;
      cube.material.color.setHSL(hue, 1, 0.5);

      if (!isSphereClicked) {
        sphere.position.y += velocityY;
        if (sphere.position.y >= initialPositionY + bounceHeight) {
          velocityY = -velocityY * 0.9;
        } else if (sphere.position.y <= initialPositionY) {
          sphere.position.y = initialPositionY;
          velocityY = -velocityY * 0.9;
        }
        velocityY -= gravity;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Eventos para el color y fondo
    const handleCylinderColorChange = () => {
      const randomColor = Math.random() * 0xffffff;
      cylinder.material.color.setHex(randomColor);
    };

    const handleBackgroundChange = () => {
      isDarkBackground.current = !isDarkBackground.current;
      scene.background = new THREE.Color(
        isDarkBackground.current ? 0x000000 : 0xffffff
      );
    };

    // Asignar eventos
    document
      .getElementById("colorButton")
      .addEventListener("click", handleCylinderColorChange);
    document
      .getElementById("backgroundButton")
      .addEventListener("click", handleBackgroundChange);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: "100vw", height: "100vh" }}>
      <div id="controls">
        <button id="colorButton">Cambiar color del cilindro</button>
        <button id="backgroundButton">Cambiar fondo</button>
      </div>
    </div>
  );
};

export default ThreeScene;
