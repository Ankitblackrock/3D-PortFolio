import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import Header from "./Layouts/Header";

// Dynamic imports for components
const Hero = React.lazy(() => import("./Layouts/Hero"));
const About = React.lazy(() => import("./Layouts/About"));
const TechStack = React.lazy(() => import("./Layouts/TechStack"));
const Project = React.lazy(() => import("./Layouts/Project"));
const Testimonial = React.lazy(() => import("./Layouts/Testimonial"));
const ContactUs = React.lazy(() => import("./Layouts/ContactUs"));
const Footer = React.lazy(() => import("./Layouts/Footer"));
const CanvasContainer = React.lazy(() => import("./Component/CanvasContainer"));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [main, setMain] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current) {
      setMain(ref.current.children[1] as HTMLElement | null); // Assuming the 2nd child is your main content
    }
  }, []);

  useEffect(() => {
    const scrollDiv = document.querySelector<HTMLElement>(".scroll_contain");

    if (!scrollDiv) {
      console.error("Scroll container not found or not an HTMLElement");
      return;
    }

    // Initialize Locomotive Scroll
    const locomotive = new LocomotiveScroll({
      lenisOptions: {
        wrapper: scrollDiv,
        smoothWheel: true,
        lerp: 0.075, // Lower value for smoother scrolling
        duration: 0.5,
      },
      scrollCallback: () => {
        // Notify GSAP's ScrollTrigger of updates
        ScrollTrigger.update();
      },
    });

    // Setup GSAP ScrollTrigger proxy
    ScrollTrigger.scrollerProxy(scrollDiv, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          locomotive.scrollTo(value, { duration: 0 });
        } else {
          return locomotive.lenisInstance?.scroll || 0;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollDiv.style.transform ? "transform" : "fixed",
    });

    // Update GSAP and Locomotive Scroll
    locomotive.start(); // Starts RAF and Lenis smooth scrolling
    locomotive.lenisInstance.on("scroll", () => ScrollTrigger.update());

    ScrollTrigger.addEventListener("refresh", () => locomotive.resize());
    ScrollTrigger.refresh();

    return () => {
      locomotive.destroy();
      ScrollTrigger.removeEventListener("refresh", () => locomotive.resize());
    };
  }, []);

  return (
    <main className="scroll_contain flex-1" ref={ref}>
      <CanvasContainer mainRef={main} /> {/* Pass mainRef to CanvasContainer */}
      <div className="max-w-7xl  mx-auto relative overflow-hidden">
        <Header />
        <Hero />
        <About />
        <TechStack />
        <Project />
        <Testimonial />
        <ContactUs />
        <Footer />
      </div>
    </main>
  );
}

export default App;
