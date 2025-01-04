import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "../ErrorBoundary";
import { Suspense, useLayoutEffect, useState, useEffect } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import SpaceShip from "./SpaceShip";
import gsap from "gsap";

const CanvasContainer = ({
  mainRef,
}: {
  mainRef: HTMLElement | null | undefined;
}) => {
  const animable = {
    x: 0,
    y: 0,
    zoom: 1,
  };

  // Define state for responsive camera settings
  const [cameraSettings, setCameraSettings] = useState({
    position: [10, 5, 10] as [number, number, number],
    fov: 50,
    dpr: [1, 2] as [number, number],
  });

  // Update responsive settings based on screen size
  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth < 576) {
        // Extra small devices (mobile)
        setCameraSettings({
          position: [25, 9, 16], // Farther back to fit content
          fov: 60, // Wider field of view
          dpr: [1, 1.5], // Reduce resolution for performance
        });
      } else if (window.innerWidth < 768) {
        // Small devices (larger mobiles/tablets)
        setCameraSettings({
          position: [13, 7, 12], // Slightly closer
          fov: 55,
          dpr: [1, 2],
        });
      } else if (window.innerWidth < 1024) {
        // Medium devices (tablets)
        setCameraSettings({
          position: [12, 6, 10], // Default position
          fov: 50,
          dpr: [1, 2],
        });
      } else {
        // Large devices (desktops)
        setCameraSettings({
          position: [10, 5, 10],
          fov: 50,
          dpr: [1, 2],
        });
      }
    };

    updateResponsiveSettings(); // Initial settings on load
    window.addEventListener("resize", updateResponsiveSettings);

    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  // GSAP animations for scroll-triggered motion
  useLayoutEffect(() => {
    if (mainRef) {
      const sections = [
        ".section-one",
        ".section-two",
        ".section-three",
        ".section-four",
        ".section-five",
        ".section-six",
      ];

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      sections.forEach((_, index) => {
        const direction = index % 2 === 0 ? -60 : 20;
        const yDirection = index % 2 === 0 ? 0 : 0.9;
        timeline.to(animable, {
          x: direction,
          y: yDirection,
        });
      });
    }
  }, [mainRef]);

  return (
    <div className="h-screen w-full fixed top-0 z-0">
      <ErrorBoundary>
        <Canvas
          shadows
          dpr={cameraSettings.dpr} // Dynamically adjust device pixel ratio
          camera={{
            position: cameraSettings.position, // Responsive camera position
            fov: cameraSettings.fov, // Responsive field of view
          }}
          style={{ touchAction: "auto" }}
        >
          <Suspense fallback={null}>
            <Stage preset="rembrandt" intensity={2} environment="park">
              <SpaceShip animable={animable} />
            </Stage>
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableRotate={false}
            enableZoom={false}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default CanvasContainer;
