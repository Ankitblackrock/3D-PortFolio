import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Galaxy component that includes two galaxies
const Galaxy = () => {
  const pointsRef1 = useRef<THREE.Points>(null); // Reference for first points object
  const pointsRef2 = useRef<THREE.Points>(null); // Reference for new galaxy points object

  const [scale, setScale] = useState<number>(1);

  // Parameters for galaxy generation
  const parameters = {
    count: 100000,
    radius: 5,
    branches: 6,
    spin: 2,
    randomness: 8,
    randomnessPower: 9,
    insideColor: "#FF604F",
    outsideColor: "#1B397C",
  };
  const particleCount = 100000;

  // Particle positions and center of mass calculation
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    let sumX = 0,
      sumY = 0,
      sumZ = 0;

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.sqrt(Math.random()) * 5;
      const angle = Math.random() * 2 * Math.PI;
      const spiral = radius * 0.1 * (Math.random() - 0.5);

      const xPos = radius * Math.cos(angle) + spiral;
      const yPos = spiral;
      const zPos = radius * Math.sin(angle) + spiral;

      positions[i * 3] = xPos;
      positions[i * 3 + 1] = yPos;
      positions[i * 3 + 2] = zPos;

      sumX += xPos;
      sumY += yPos;
      sumZ += zPos;
    }

    const centerOfMass = new THREE.Vector3(
      sumX / particleCount,
      sumY / particleCount,
      sumZ / particleCount
    );

    return { positions, centerOfMass };
  }, [particleCount]);

  // Galaxy attributes generation with color gradients
  const generateGalaxy = () => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  };

  const galaxyAttributes = useMemo(generateGalaxy, []);

  // Animation to rotate both galaxies
  useFrame(() => {
    if (pointsRef1.current) {
      pointsRef1.current.rotation.y += 0.005;
    }
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setScale((prevScale) => Math.min(prevScale * 1.05, 5)); // Increase scale
      } else {
        setScale((prevScale) => Math.max(prevScale / 1.05, 1)); // Decrease scale
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Original galaxy particles */}
      <points
        ref={pointsRef1}
        position={[0, 0, 0]}
        scale={3}
        rotation={[Math.PI / 4, 0, 0]}
      >
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={particles.positions}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          color="#ffffff"
          size={0.03}
          sizeAttenuation
        />
      </points>

      {/* New galaxy particles with color gradients */}
      <points
        ref={pointsRef2}
        position={[0, 0, 0]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={scale * 2.5}
      >
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={galaxyAttributes.positions}
            count={parameters.count}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={galaxyAttributes.colors}
            count={parameters.count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.02}
          vertexColors
          sizeAttenuation
        />
      </points>
    </>
  );
};

export default Galaxy;
