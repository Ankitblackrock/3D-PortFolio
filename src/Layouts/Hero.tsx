import { PerspectiveCamera, Html, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Galaxy from "../Component/Galaxy";
import { Suspense, useEffect, useState } from "react";
import TypeWritertext from "../Component/TypeWritertext";
import ErrorBoundary from "../ErrorBoundary";

// Move the logic for responsiveness inside the Canvas component
const ResponsiveScene = () => {
  const { viewport } = useThree();
  const [config, setConfig] = useState({
    scale: 1,
    position: [-2.2, -1.05, 5.9] as [number, number, number],
    cameraPosition: [0, 0, 10] as [number, number, number],
  });

  useEffect(() => {
    const updateConfig = () => {
      if (viewport.width < 600) {
        setConfig({
          scale: 0.8,
          position: [-1.8, -1, 5.5],
          cameraPosition: [0, 0, 8],
        });
      } else if (viewport.width < 1024) {
        setConfig({
          scale: 0.9,
          position: [-2.0, -1.05, 5.7],
          cameraPosition: [0, 0, 9],
        });
      } else {
        setConfig({
          scale: 1,
          position: [-2.2, -1.05, 5.9],
          cameraPosition: [0, 0, 10],
        });
      }
    };

    updateConfig();
    window.addEventListener("resize", updateConfig);

    return () => window.removeEventListener("resize", updateConfig);
  }, [viewport]);

  return (
    <>
      <PerspectiveCamera makeDefault position={config.cameraPosition} />

      <Suspense fallback={<Html>Loading...</Html>}>
        <Galaxy />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={0.1} />
      </Suspense>
    </>
  );
};

const Hero = () => {
  return (
    <section className="bg-black w-full h-[100vh] relative flex flex-col justify-center items-start">
      <div className="grid grid-cols-2">
        <div className="text-white text-[60px] mx-0 font-bold p-6 mb-4">
          Make Your Dream <br />
          <TypeWritertext text={"Come True !!"} />
        </div>
      </div>

      <div className="w-full h-full absolute top-0">
        <ErrorBoundary>
          <Canvas gl={{ antialias: false }}>
            <OrbitControls
              autoRotate
              enablePan={false}
              enableRotate={false}
              enableZoom={false}
            />
            <ResponsiveScene />
          </Canvas>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default Hero;
