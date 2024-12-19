// Import necessary packages
import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: ReactNode;
}

export const ScrollAnimationFromLeft: React.FC<ScrollAnimationProps> = ({
  children,
}) => {
  // Use ref to target the element for animation
  const boxRef = useRef(null);

  useEffect(() => {
    // GSAP animation setup
    gsap.fromTo(
      boxRef.current,
      { x: -450 }, // Start position (off-screen to the left)
      {
        x: "10%", // End position (off-screen to the right)
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 70%", // Animation starts when the element hits 80% of viewport height
          end: "top 60%", // Animation ends when the element reaches 20% of viewport height
          scrub: true, // Smooth scrolling effect
          toggleActions: "play reverse play reverse", // Play and reverse based on scroll
        },
      }
    );
  }, []);

  return (
    <div className="scroll-container">
      <div ref={boxRef} className="animated-box">
        {children}
      </div>
    </div>
  );
};

export const ScrollAnimationFromRight: React.FC<ScrollAnimationProps> = ({
  children,
}) => {
  // Use ref to target the element for animation
  const boxRef2 = useRef(null);

  useEffect(() => {
    // GSAP animation setup
    gsap.fromTo(
      boxRef2.current,
      { x: 450 }, // Start position (off-screen to the left)
      {
        x: "0%", // End position (off-screen to the right)
        scrollTrigger: {
          trigger: boxRef2.current,
          start: "top 90%", // Animation starts when the element hits 80% of viewport height
          end: "top 80%", // Animation ends when the element reaches 20% of viewport height
          scrub: true, // Smooth scrolling effect
          toggleActions: "play reverse play reverse", // Play and reverse based on scroll
        },
      }
    );
  }, []);

  return (
    <div className="scroll-container">
      <div ref={boxRef2} className="animated-box">
        {children}
      </div>
    </div>
  );
};
