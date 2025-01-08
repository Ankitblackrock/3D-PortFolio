import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import useOnScrollShow from "../hooks/useOnScrollShow";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  useOnScrollShow(
    textRef,
    {
      from: { opacity: 0, y: 150 },
      to: { opacity: 1, y: 0, duration: 5 },
    },
    {
      trigger: "#section-one",
      start: "top 100%",
      end: "top 30%",
      scrub: 2,
    }
  );
  return (
    <section className="w-full z-50 dark-bg section-one" id="section-one">
      <div className="p-6 py-14">
        <h2 className="text-5xl text-center font-bold primary-color">ABOUT.</h2>
        <div className="grid grid-cols-1 gap-8 md:gap-0 md:grid-cols-2 mt-12 items-center relative overflow-hidden">
          <img src="/images/myimage.jpeg" width={250} />
          <div className="testimonial-card p-6 relative z-20" ref={textRef}>
            {" "}
            <img
              src="/images/comma.svg"
              alt="comma.svg"
              width={25}
              className="float-left"
            />
            <p className="text-white font-medium text-base mt-8">
              I am a Front-End Developer with extensive experience in designing
              and building web and mobile applications using React.js, Next.js,
              and React Native. Proficient in JavaScript, TypeScript, HTML5,
              CSS, and modern frameworks like Tailwind and SASS, I specialize in
              creating responsive, high-performance user interfaces. My
              expertise also includes state management with Redux, API
              integration, unit testing with Jest, and optimizing web
              performance. I have a strong understanding of Agile methodologies,
              working collaboratively with cross-functional teams to deliver
              quality solutions. With a background in both e-commerce and
              interactive web applications, I am committed to delivering
              innovative and scalable solutions that enhance user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
