import { ProjectData } from "../data/ProjectsData";
import Tilt from "react-parallax-tilt";

function Project() {
  return (
    <section className="dark-bg z-10 px-7 py-12 section-three">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
        {ProjectData.map((item) => (
          <Tilt glareEnable={true} className="p-5 md:w-[70%] w-full">
            <div className="flex flex-col justify-between items-start gap-4">
              <div className="w-full h-[15rem] rounded-3xl animated-bg  px-3 flex justify-center items-center">
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
                <img src="/dist/images/techImg/github.png" width={40} />
              </a>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

export default Project;
