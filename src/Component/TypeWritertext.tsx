import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import SplitType from "split-type";

interface TypewriterTextProps {
  text: string;
}

const TypeWritertext: React.FC<TypewriterTextProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      // Split text into characters
      const splitText = new SplitType(textRef.current, { types: "chars" });

      // Create a GSAP timeline for continuous animation
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Animate each character one by one
      tl.fromTo(
        splitText.chars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.2,
          ease: "power1.inOut",
        }
      ).to(
        splitText.chars,
        {
          opacity: 0,
          duration: 0.05,
          stagger: 0.05,
          ease: "power1.inOut",
        },
        "+=1" // Optional delay before fading out
      );

      // Cleanup on unmount
      return () => {
        splitText.revert();
        tl.kill();
      };
    }
  }, [text]);

  return <div ref={textRef}>{text}</div>;
};

export default TypeWritertext;
