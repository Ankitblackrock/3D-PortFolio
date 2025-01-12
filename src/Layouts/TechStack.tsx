import { useRef } from "react";
import { StackImg } from "../data/StackData";
import useOnScrollShow from "../hooks/useOnScrollShow";
import ReactNativeIcon from "../components/ReactNativeIcon";

type StackKeys = keyof typeof StackImg;

function TechStack() {
  const techCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useOnScrollShow(
    techCardRefs,
    {
      from: { opacity: 0, y: 150 },
      to: { opacity: 1, y: 0, duration: 0.5 },
    },
    {
      start: "top 80%",
      end: "top 30%",
      scrub: true,
    },
    0.2 // Stagger of 0.2 seconds
  );

  return (
    <section className="dark-bg py-16 px-12 z-20 section-two">
      <h2 className="text-5xl text-center font-bold primary-color">SKILLS.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
        {["frontend", "backend", "languages", "devops", "mobile"].map(
          (id, index) => (
            <div
              id={id}
              key={id}
              className="tech-card relative z-20"
              ref={(el) => (techCardRefs.current[index] = el)}
            >
              <h4 className="text-white text-center py-5 text-2xl font-medium">
                {id.toUpperCase().replace("-", " ")}
              </h4>
              <div className="relative">
                <div className="border-2 w-80 h-96 border-[#dd4dd] rounded-md -z-0 "></div>
                <div
                  className={`border-2  border-[#2627CF] w-80 h-96 rounded-md absolute top-6 md:top-6 md:left-6 z-10 glassbg grid ${
                    id !== "frontend" && id !== "devops"
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  } p-2`}
                >
                  {(StackImg[id as StackKeys] || []).map((item, itemIndex) => (
                    <div className="flex items-center" key={itemIndex}>
                      {item.name === "React Native" ? (
                        <ReactNativeIcon color="white" />
                      ) : (
                        <img
                          src={item.imgsrc}
                          alt={item.name}
                          width={45}
                          loading="lazy"
                        />
                      )}
                      <span className="text-white">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default TechStack;
