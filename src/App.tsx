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
  return (
    <main className="" ref={ref}>
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
