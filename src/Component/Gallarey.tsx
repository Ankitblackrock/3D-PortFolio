import { useLayoutEffect, useRef } from "react";
import { ProjectData } from "../data/ProjectsData";
import Card from "./Card";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Gallery = () => {
  gsap.registerPlugin(ScrollTrigger);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".panel"); // Selecting each card section
    console.log(sections);
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        start: "top top",
        end: () => "+=" + containerRef.current!.offsetWidth,
      },
    });
  }, []);

  return (
    <div className="container flex overflow-x-hidden" ref={containerRef}>
      {ProjectData.map((item, index) => (
        <Card key={index} title={item.title} />
      ))}
    </div>
  );
};

export default Gallery;
