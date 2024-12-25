import {
  ScrollAnimationFromLeft,
  ScrollAnimationFromRight,
} from "../Component/ScrollTrigger";

const About = () => {
  return (
    <section className="w-full dark-bg section-one">
      <div className="p-6 py-14">
        <h2 className="text-[40px] font-bold text-center text-white">
          About Me
        </h2>
        <div className="grid grid-cols-1 gap-8 md:gap-0 md:grid-cols-2 mt-12 items-center relative overflow-hidden">
          <ScrollAnimationFromLeft>
            <img
              src="/images/myimage.jpeg"
              width={250}
              className="rounded-[2rem]"
            />
          </ScrollAnimationFromLeft>
          <ScrollAnimationFromRight>
            <p className="text-white font-normal text-sm">
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
          </ScrollAnimationFromRight>
        </div>
      </div>
    </section>
  );
};

export default About;
