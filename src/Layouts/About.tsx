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

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/public/doc/Ankit_Chowdhury_React_Developer_Resume.pdf";
    link.download = "Ankit_Chowdhury_React_Developer_Resume.pdf";
    link.click();
  };
  return (
    <section
      className="w-full z-50 px-2 md:px-11 py-14 dark-bg section-one"
      id="section-one"
    >
      <h2 className="text-5xl text-center font-bold primary-color">ABOUT.</h2>
      <div className="grid grid-cols-1 gap-20 md:gap-0 md:grid-cols-2 mt-12 items-center relative overflow-hidden p-6">
        <div className="relative">
          <div className="border-2  border-[#2627CF] w-[250px] absolute right-[24px] bottom-[21px] h-[21rem] z-10 glassbg rounded-md" />
          <img
            src="/images/myimage.jpeg"
            width={250}
            className="z-20 relative rounded-md"
          />
        </div>
        <div className="testimonial-card p-6 z-20 " ref={textRef}>
          {" "}
          <img
            src="/images/comma.svg"
            alt="comma.svg"
            width={25}
            className="float-left"
          />
          <p className="text-white font-medium text-sm md:text-base mt-8">
            Front-End Developer with expertise in React.js, Next.js, and React
            Native, specializing in building responsive, high-performance user
            interfaces. Proficient in JavaScript, TypeScript, HTML5, CSS,
            Tailwind, and SASS, with skills in Redux state management, API
            integration, and unit testing. Experienced in Agile workflows and
            collaborating with cross-functional teams to deliver scalable,
            innovative solutions. Background in e-commerce and interactive web
            applications, focused on enhancing user experiences and optimizing
            web and mobile performance.
          </p>
          <div
            className="border border-white bg-[#bababa] w-36 p-3 text-center mt-4 float-left font-semibold text-[#303030] cursor-pointer rounded-sm active:bg-[#303030] active:text-[#bababa]"
            onClick={handleDownloadCV}
          >
            Download CV
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
