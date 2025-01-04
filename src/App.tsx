import { useEffect, useRef, useState } from "react";
import "./App.css";
import CanvasContainer from "./Component/CanvasContainer";
import About from "./Layouts/About";
import Hero from "./Layouts/Hero";
import Testimonial from "./Layouts/Testimonial";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStack from "./Layouts/TechStack";
import Project from "./Layouts/Project";
import ContactUs from "./Layouts/ContactUs";
import Footer from "./Layouts/Footer";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [main, setMain] = useState<HTMLElement | null>();
  const ref = useRef<HTMLElement | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      setMain(ref.current.children[1] as HTMLElement | null);
    }
  }, [main]);

  useEffect(() => {
    if (ref.current) {
      setMain(ref.current.children[1] as HTMLElement | null);
    }
  }, [main]);

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
        return value !== undefined
          ? locomotive.scrollTo(value, { duration: 0 })
          : locomotive.lenisInstance?.scroll || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Refresh GSAP and Locomotive Scroll
    ScrollTrigger.addEventListener("refresh", () => locomotive.resize());
    ScrollTrigger.refresh();

    return () => {
      // Cleanup
      locomotive.destroy();
      ScrollTrigger.removeEventListener("refresh", () => locomotive.resize());
    };
  }, []);
  return (
    <main className="scroll_contain" ref={ref}>
      <CanvasContainer mainRef={main} />
      <div ref={pageRef}>
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
