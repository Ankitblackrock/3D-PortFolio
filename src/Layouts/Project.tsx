import { useRef } from "react";
import { ProjectData } from "../data/ProjectsData";
import Tilt from "react-parallax-tilt";
import useOnScrollShow from "../hooks/useOnScrollShow";

function Project() {
  return (
    <section className="dark-bg z-10 px-7 py-12 section-three">
      <h1 className="text-5xl text-center font-bold primary-color mb-8">
        PROJECTS.
      </h1>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-9 relative z-20">
        <ProjectMapComp />
      </div>
    </section>
  );
}

export default Project;

export const ProjectMapComp = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useOnScrollShow(
    cardRefs,
    {
      from: { opacity: 0, y: 150 },
      to: { opacity: 1, y: 0, duration: 0.5 },
    },
    {
      start: "top 80%",
      end: "top 30%",
      scrub: true,
    }
  );

  return (
    <>
      {ProjectData.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
        >
          <Tilt
            glareEnable={true}
            className="p-5 md:w-[70%] w-full contact-us-card"
          >
            <div className="flex flex-col justify-between items-start gap-4">
              <div className="w-full h-[15rem] rounded-3xl animated-bg px-3 flex justify-center items-center">
                <img
                  className="bg-white w-[98%] h-[13rem] rounded-2xl"
                  src={item.imgsrc}
                  alt={item.title}
                />
              </div>
              <h3 className="text-white text-4xl font-normal mt-8">
                {item.title}
              </h3>
              <p className="text-white text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam perspiciatis quod quas quisquam velit, tempore sed
                error nobis voluptatem, ut corporis veritatis dolorum! Saepe
                molestias consequatur commodi, omnis tenetur aspernatur?
              </p>
              <a href={item.link} className="m-0">
                <img src="/images/techImg/github.png" width={40} />
              </a>
            </div>
          </Tilt>
        </div>
      ))}
    </>
  );
};
