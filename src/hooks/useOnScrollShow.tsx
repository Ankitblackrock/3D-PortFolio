import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  from: { [key: string]: string | number };
  to: { [key: string]: string | number };
}

// Update the type of elementsRef to accept both single elements and arrays of elements
const useOnScrollShow = (
  elementsRef: any,
  animationConfig: AnimationConfig,
  scrollTriggerConfig: ScrollTrigger.Vars,
  stagger: number = 0.1
) => {
  useLayoutEffect(() => {
    const animations: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const current = elementsRef.current;

      // Handle array of elements
      if (Array.isArray(current)) {
        current.forEach((element) => {
          if (element) {
            const anim = gsap.fromTo(element, animationConfig.from, {
              ...animationConfig.to,
              stagger,
              scrollTrigger: {
                trigger: element,
                ...scrollTriggerConfig,
              },
            });
            animations.push(anim.scrollTrigger as ScrollTrigger);
          }
        });
      }
      // Handle a single HTMLElement
      else if (current instanceof HTMLElement) {
        const anim = gsap.fromTo(current, animationConfig.from, {
          ...animationConfig.to,
          stagger,
          scrollTrigger: {
            trigger: current,
            ...scrollTriggerConfig,
          },
        });
        animations.push(anim.scrollTrigger as ScrollTrigger);
      }
    });

    return () => {
      animations.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, [elementsRef, animationConfig, scrollTriggerConfig, stagger]);
};

export default useOnScrollShow;
