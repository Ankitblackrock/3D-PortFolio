import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState, useEffect, useLayoutEffect } from "react";
import { Stage } from "@react-three/drei";
import SpaceShip from "./SpaceShip";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasContainer = ({
  mainRef,
}: {
  mainRef: HTMLElement | null | undefined;
}) => {
  const isMobile = window.innerWidth < 768;
  const animable = { x: 0, y: 0, rotation: 0 };

  const [cameraSettings, setCameraSettings] = useState({
    position: isMobile ? [25, 10, 15] : ([10, 5, 10] as any),
    fov: isMobile ? 60 : 50,
    dpr: isMobile ? [1, 1.5] : ([1, 2] as any),
  });

  const updateResponsiveSettings = () => {
    if (window.innerWidth < 576) {
      setCameraSettings({ position: [25, 9, 16], fov: 60, dpr: [1, 1.5] });
    } else if (window.innerWidth < 768) {
      setCameraSettings({ position: [13, 7, 12], fov: 55, dpr: [1, 2] });
    } else {
      setCameraSettings({ position: [10, 5, 10], fov: 50, dpr: [1, 2] });
    }
  };

  useEffect(() => {
    updateResponsiveSettings();
    const handleResize = () => updateResponsiveSettings();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Throttle function outside the useLayoutEffect to avoid recreation on every render
  const throttle = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T => {
    let lastCall = 0;
    return ((...args: Parameters<T>) => {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    }) as T;
  };

  useLayoutEffect(() => {
    if (mainRef) {
      const setupScrollAnimation = () => {
        // Clear any existing ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Create a new GSAP timeline with ScrollTrigger
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: mainRef,
            start: "top top",
            end: "bottom center", // Stop at the center of section-four
            scrub: 0.5, // Smooth progress, scrub factor adjusted
            invalidateOnRefresh: true, // Recalculate on refresh
          },
        });

        const sections = [
          ".section-one",
          ".section-two",
          ".section-three",
          ".section-four",
          ".section-five",
        ];

        // Animate each section
        sections.forEach((_, index) => {
          if (index === sections.length - 1) {
            // Center the object and rotate 45 degrees towards the camera at section-four
            timeline.to(animable, {
              x: 0,
              y: 0,
              rotation: Math.PI / 4,
            });
          } else {
            timeline.to(animable, {
              x: index % 2 === 0 ? -60 : 20,
              y: index % 2 === 0 ? 0.3 : 0.9,
              rotation: 0,
            });
          }
        });
      };

      // Throttled initialization to prevent excessive calls
      const throttledScrollTrigger = throttle(setupScrollAnimation, 2000); // Slightly higher throttle time for better performance

      // Initialize scroll animation
      throttledScrollTrigger();

      // Refresh ScrollTrigger once the DOM is ready
      ScrollTrigger.refresh();

      // Cleanup on unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [mainRef]);

  return (
    <div className="h-screen w-full fixed top-0 z-10">
      <Canvas
        shadows
        dpr={cameraSettings.dpr}
        camera={{ position: cameraSettings.position, fov: cameraSettings.fov }}
      >
        <Suspense fallback={null}>
          <Stage
            preset="rembrandt"
            intensity={1.5}
            shadows={window.innerWidth >= 576} // Disable shadows for small screens
            environment="park"
          >
            <SpaceShip animable={animable} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default React.memo(CanvasContainer);
