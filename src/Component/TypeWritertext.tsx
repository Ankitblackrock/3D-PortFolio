import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import React, { useEffect, useRef } from "react";

// Register GSAP TextPlugin
gsap.registerPlugin(TextPlugin);

interface TypewriterTextProps {
  text: string[];
}

const TypeWriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const masterTl = gsap.timeline({ repeat: -1 });

    text.forEach((word) => {
      const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
      tl.to(textRef.current, {
        duration: 2,
        text: word,
      });
      masterTl.add(tl);
    });

    // Blinking cursor effect
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        delay: 1.5,
      });
    }
  }, [text]);

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <div ref={textRef} style={{ display: "inline", whiteSpace: "nowrap" }} />
      <span ref={cursorRef}>|</span>
    </div>
  );
};

export default TypeWriterText;
