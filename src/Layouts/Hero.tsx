import { PerspectiveCamera, Html, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Galaxy from "../Component/Galaxy";
import { Suspense, useEffect, useState } from "react";
import TypeWritertext from "../Component/TypeWritertext";
import ErrorBoundary from "../ErrorBoundary";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
  // useLayoutEffect(() => {
  //   // Initialize GSAP animation with ScrollTrigger
  //   const scrollZoom = gsap.timeline({
  //     scrollTrigger: {
  //       id: "ZOOM",
  //       trigger: ".hero-section",
  //       scrub: true,
  //       start: "top top",
  //       end: "bottom top",
  //       pin: true,
  //       // markers: true,
  //       invalidateOnRefresh: true, // Ensures animations sync on page refresh or resize
  //       onLeave: () => {
  //         // Smoothly reset to original size when leaving the section
  //         gsap.to("#galaxy", {
  //           scale: 1,
  //           duration: 0.5,
  //           ease: "power1.inOut",
  //         });
  //       },
  //       onEnterBack: () => {
  //         // Smoothly zoom back when re-entering the section
  //         gsap.to("#galaxy", {
  //           scale: 2,
  //           duration: 0.5,
  //           ease: "power1.inOut",
  //         });
  //       },
  //     },
  //   });

  //   // Define animation for zoom
  //   scrollZoom.fromTo(
  //     "#galaxy",
  //     { scale: 1 },
  //     { scale: 2, transformOrigin: "center center", ease: "power2.inOut" }
  //   );

  //   // Refresh ScrollTrigger when Locomotive updates
  //   ScrollTrigger.refresh();

  //   return () => {
  //     scrollZoom.scrollTrigger?.kill();
  //     scrollZoom.kill();
  //   };
  // }, []);
  useEffect(() => {
    const boxTimeline = gsap.timeline();
    const hiTimeline = gsap.timeline();

    boxTimeline
      .to("#box", {
        duration: 1,
        width: "25vw",
        delay: 1,
        ease: "power4.inOut",
      })
      .to("#box", {
        duration: 2,
        autoAlpha: 0.7,
        yoyo: true,
        repeat: -1,
        ease: "rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})",
      });

    hiTimeline
      .from("#hi", {
        duration: 1,
        y: "7rem",
        ease: "power3.out",
        opacity: 0,
      }) // Move #hi from 7rem below and fade in
      .to("#hi", {
        opacity: 0.5,
        duration: 0.8,
        ease: "power3.inOut",
      }) // Change opacity smoothly to 0.5
      .to("#hi", {
        y: "0",
        duration: 1,
        ease: "power3.inOut",
        opacity: 1,
      }); // Move #hi to its original position and fade to full opacity
  }, []);

  return (
    <section className="bg-black w-full h-[100vh] relative  flex flex-col justify-center items-start hero-section">
      <div className="absolute top-0 w-full h-full">
        {" "}
        <div className="grid grid-cols-2 absolute top-48 left-0 w-full z-10">
          <div
            className="text-white text-[60px] mx-0 font-bold p-6 mb-4"
            id="hi"
          >
            Hi, I Am <br />
            <div
              id="box"
              className="absolute bottom-28 inline-block bg-[#2627CF] h-[1vw] -z-10"
            ></div>
            <TypeWritertext
              text={["FrontEnd Developer", "Software Developer"]}
            />
          </div>
        </div>
        <div className="w-full h-full" id="galaxy">
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
      </div>
    </section>
  );
};

export default Hero;
